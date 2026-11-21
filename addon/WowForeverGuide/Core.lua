-- WoW Forever Guide: the website's leveling guide in game, 1:1.
-- Everything the guide says comes from Guides\*.lua, made from the website by
-- tools/export-addon-guide.js. This file only draws it.

local ADDON = ...
local NAME = "|cffffd200WoW Forever Guide|r"
local KINDS = WowForeverGuide_Kinds or {}

local GOLD, KEY, GREEN, ORANGE, GREY, WHITE = "|cffffd200", "|cff7fd4ff", "|cff80e080", "|cffff9933", "|cff9a9a9a", "|cffffffff"

local db            -- saved per character
local gdb           -- this guide's progress: { step = n, ticks = { [step] = { [n] = true } } }
local guide         -- the guide for this character
local shownStep     -- the step the arrow was last set for
local tab = "guide"
local barsLevel     -- level shown on the Action Bars tab (nil = your level)

local function Say(msg) print(NAME .. ": " .. msg) end
local function Plain(s) return (s or ""):gsub("|c%x%x%x%x%x%x%x%x", ""):gsub("|r", ""):gsub("|H.-|h(.-)|h", "%1") end
local function MyLevel() return UnitLevel("player") or 1 end
local function Icon(name, size) return name and ("|TInterface\\Icons\\" .. name .. ":" .. (size or 16) .. "|t ") or "" end

local function StepForLevel(level)
  for i, s in ipairs(guide.steps) do
    if (s.hi or 1) >= level then return i end
  end
  return #guide.steps
end

------------------------------------------------------------------------
-- TomTom arrow (only when TomTom is installed)
------------------------------------------------------------------------

-- Classic map ids, used when a zone can't be found by name
local MAP_IDS = {
  ["Dun Morogh"] = 1426, ["Ironforge"] = 1455, ["Loch Modan"] = 1432, ["Stormwind"] = 1453,
  ["Wetlands"] = 1437, ["Redridge Mountains"] = 1433, ["Duskwood"] = 1431, ["Hillsbrad Foothills"] = 1424,
  ["Arathi Highlands"] = 1417, ["Stranglethorn Vale"] = 1434, ["Thousand Needles"] = 1441,
  ["Tirisfal Glades"] = 1420, ["Dustwallow Marsh"] = 1445, ["Tanaris"] = 1446, ["Feralas"] = 1444,
  ["The Hinterlands"] = 1425, ["Searing Gorge"] = 1427, ["Un'Goro Crater"] = 1449, ["Felwood"] = 1448,
  ["Burning Steppes"] = 1428, ["Western Plaguelands"] = 1422, ["Eastern Plaguelands"] = 1423,
  ["Winterspring"] = 1452, ["Teldrassil"] = 1438, ["Darnassus"] = 1457, ["Darkshore"] = 1439,
  ["Ashenvale"] = 1440, ["Stonetalon Mountains"] = 1442, ["Desolace"] = 1443, ["Westfall"] = 1436,
  ["Elwynn Forest"] = 1429, ["Silverpine Forest"] = 1421, ["Azshara"] = 1447, ["Silithus"] = 1451,
  ["Moonglade"] = 1450, ["Badlands"] = 1418, ["Swamp of Sorrows"] = 1435, ["Blasted Lands"] = 1419,
  ["Alterac Mountains"] = 1416, ["The Barrens"] = 1413,
}
local ALIASES = { ["Stormwind"] = "Stormwind City" }
local found = {}

local function MapID(zone)
  if found[zone] ~= nil then return found[zone] or nil end
  local id = false
  -- by name first, so new WoW Forever zones work too
  if C_Map and C_Map.GetMapChildrenInfo and Enum and Enum.UIMapType then
    local ok, kids = pcall(C_Map.GetMapChildrenInfo, 947, Enum.UIMapType.Zone, true)
    if ok and kids then
      local want = (ALIASES[zone] or zone):lower()
      for _, info in ipairs(kids) do
        if info.name and info.name:lower() == want then id = info.mapID break end
      end
    end
  end
  if not id then id = MAP_IDS[zone] or false end
  found[zone] = id
  return id or nil
end

local waypoints = {}

local function ClearArrow()
  if TomTom and TomTom.RemoveWaypoint then
    for _, uid in ipairs(waypoints) do pcall(TomTom.RemoveWaypoint, TomTom, uid) end
  end
  wipe(waypoints)
end

local function AddPin(p, title)
  local map = MapID(p.zone)
  if not map then return false end
  local ok, uid = pcall(TomTom.AddWaypoint, TomTom, map, p.x / 100, p.y / 100, {
    title = Plain(p.label ~= nil and p.label or title),
    from = "WoW Forever Guide", persistent = false, minimap = true, world = true,
  })
  if ok and uid then waypoints[#waypoints + 1] = uid return true end
  return false
end

local function SetArrow(step)
  ClearArrow()
  if not (db.arrow and TomTom and TomTom.AddWaypoint) then return end
  for _, p in ipairs(step.pins or {}) do AddPin(p, step.title) end
  if #waypoints > 0 and TomTom.SetClosestWaypoint then pcall(TomTom.SetClosestWaypoint, TomTom) end
end

-- clicked one spot on the map list: point the arrow only there
local function ArrowTo(p, step)
  if not (TomTom and TomTom.AddWaypoint) then
    Say("the arrow needs the TomTom addon. It's on the must-have list on the website.")
    return
  end
  ClearArrow()
  if AddPin(p, step.title) then
    Say(("arrow points to %s (%s, %s)."):format(Plain(p.label or p.zone), p.x, p.y))
  else
    Say(("couldn't find %s on the map. Head to %s, %s there."):format(p.zone, p.x, p.y))
  end
end

------------------------------------------------------------------------
-- Quest log: which of the step's bold names are quests you have
------------------------------------------------------------------------

local function QuestLogStatus(names)
  local out = {}
  if not (names and GetNumQuestLogEntries and GetQuestLogTitle) then return out end
  local want = {}
  for _, n in ipairs(names) do want[n:lower()] = n end
  local ok, num = pcall(GetNumQuestLogEntries)
  if not ok or not num then return out end
  for i = 1, num do
    local title, _, _, isHeader, _, isComplete = GetQuestLogTitle(i)
    if title and not isHeader and want[title:lower()] then
      local objectives, allDone = {}, true
      local count = GetNumQuestLeaderBoards and GetNumQuestLeaderBoards(i) or 0
      for j = 1, count do
        local text, _, finished = GetQuestLogLeaderBoard(j, i)
        if text then
          objectives[#objectives + 1] = (finished and GREEN or WHITE) .. text .. "|r"
          if not finished then allDone = false end
        end
      end
      out[#out + 1] = { name = title, ready = isComplete == 1 or (count > 0 and allDone), objectives = objectives }
    end
  end
  return out
end

------------------------------------------------------------------------
-- The box
------------------------------------------------------------------------

local WIDTH, PAD = 340, 14
local MAX_HEIGHT = 350    -- the box never gets taller than this; longer pages scroll
local BOTTOM = 14 + 22 + PAD
local BACKDROP = {
  bgFile = "Interface\\Tooltips\\UI-Tooltip-Background",
  edgeFile = "Interface\\Tooltips\\UI-Tooltip-Border",
  tile = true, tileSize = 16, edgeSize = 16,
  insets = { left = 4, right = 4, top = 4, bottom = 4 },
}

local f = CreateFrame("Frame", "WowForeverGuideFrame", UIParent, "BackdropTemplate")
f:SetSize(WIDTH, 200)
f:SetFrameStrata("MEDIUM")
f:SetClampedToScreen(true)
f:SetMovable(true)
f:EnableMouse(true)
f:RegisterForDrag("LeftButton")
f:SetBackdrop(BACKDROP)
f:SetBackdropColor(0.04, 0.04, 0.07, 0.92)
f:SetBackdropBorderColor(0.75, 0.6, 0.3, 1)
f:Hide()
f:SetScript("OnDragStart", function(self) self:StartMoving() end)
f:SetScript("OnDragStop", function(self)
  self:StopMovingOrSizing()
  local point, _, relPoint, x, y = self:GetPoint()
  db.pos = { point, relPoint, x, y }
end)

local close = CreateFrame("Button", nil, f, "UIPanelCloseButton")
close:SetPoint("TOPRIGHT", 0, 0)

-- tabs: the same five as the website
local TABS = {
  { id = "guide", label = "Quest Guide" },
  { id = "bars", label = "Action Bars" },
  { id = "play", label = "How to Play" },
  { id = "talents", label = "Talents" },
  { id = "words", label = "Words" },
}
local tabButtons = {}
local Render, SetTab   -- defined below

for i, t in ipairs(TABS) do
  local b = CreateFrame("Button", nil, f)
  local fs = b:CreateFontString(nil, "OVERLAY", "GameFontNormalSmall")
  fs:SetPoint("CENTER")
  fs:SetText(t.label)
  b:SetFontString(fs)
  b:SetSize(fs:GetStringWidth() + 8, 18)
  if i == 1 then b:SetPoint("TOPLEFT", PAD - 4, -8) else b:SetPoint("LEFT", tabButtons[i - 1], "RIGHT", 2, 0) end
  local line = b:CreateTexture(nil, "ARTWORK")
  line:SetColorTexture(1, 0.82, 0, 0.9)
  line:SetHeight(2)
  line:SetPoint("BOTTOMLEFT", 3, 0)
  line:SetPoint("BOTTOMRIGHT", -3, 0)
  b.line, b.label, b.id = line, fs, t.id
  b:SetScript("OnClick", function() SetTab(t.id) end)
  tabButtons[i] = b
end

-- the "XP bar": how far through the guide you are
local progress = CreateFrame("StatusBar", nil, f)
progress:SetPoint("TOPLEFT", PAD, -30)
progress:SetPoint("RIGHT", f, "RIGHT", -PAD, 0)
progress:SetHeight(13)
progress:SetStatusBarTexture("Interface\\TargetingFrame\\UI-StatusBar")
progress:SetStatusBarColor(0.58, 0.0, 0.55)
progress:SetMinMaxValues(0, 1)
local progressBg = progress:CreateTexture(nil, "BACKGROUND")
progressBg:SetAllPoints()
progressBg:SetColorTexture(0, 0, 0, 0.55)
local progressText = progress:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
progressText:SetPoint("CENTER", 0, 1)

local meta = f:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
meta:SetPoint("TOPLEFT", progress, "BOTTOMLEFT", 0, -8)
meta:SetWidth(WIDTH - PAD * 2)
meta:SetJustifyH("LEFT")
meta:SetTextColor(0.75, 0.75, 0.75)

local title = f:CreateFontString(nil, "OVERLAY", "GameFontNormalLarge")
title:SetPoint("TOPLEFT", meta, "BOTTOMLEFT", 0, -4)
title:SetWidth(WIDTH - PAD * 2)
title:SetJustifyH("LEFT")

-- scroll area: long pages scroll instead of making the box taller
local sf = CreateFrame("ScrollFrame", nil, f)
sf:SetPoint("TOPLEFT", title, "BOTTOMLEFT", 0, -8)
sf:SetPoint("RIGHT", f, "RIGHT", -PAD, 0)
sf:SetPoint("BOTTOM", f, "BOTTOM", 0, BOTTOM)

local content = CreateFrame("Frame", nil, sf)
content:SetSize(WIDTH - PAD * 2, 1)
sf:SetScrollChild(content)

local function NewScrollBar(parent, area)
  local bar = CreateFrame("Slider", nil, parent)
  bar:SetOrientation("VERTICAL")
  bar:EnableMouse(true)
  bar:SetWidth(5)
  bar:SetPoint("TOP", area, "TOP", 0, 0)
  bar:SetPoint("BOTTOM", area, "BOTTOM", 0, 0)
  bar:SetPoint("RIGHT", parent, "RIGHT", -PAD + 2, 0)
  bar:SetMinMaxValues(0, 0)
  bar:SetValue(0)
  local track = bar:CreateTexture(nil, "BACKGROUND")
  track:SetAllPoints()
  track:SetColorTexture(1, 1, 1, 0.08)
  local thumb = bar:CreateTexture(nil, "OVERLAY")
  thumb:SetColorTexture(0.75, 0.6, 0.3, 0.9)
  thumb:SetSize(5, 30)
  bar:SetThumbTexture(thumb)
  bar.thumb = thumb
  bar:SetScript("OnValueChanged", function(_, v) area:SetVerticalScroll(v) end)
  bar:Hide()
  return bar
end

local bar = NewScrollBar(f, sf)
f:EnableMouseWheel(true)
f:SetScript("OnMouseWheel", function(_, delta)
  if bar:IsShown() then bar:SetValue(bar:GetValue() - delta * 40) end
end)

------------------------------------------------------------------------
-- Hover and click on words, spells and map spots (|Hwfw:..|h links)
------------------------------------------------------------------------

local currentStep   -- the step on screen, for map clicks

local function LinkEnter(self, link)
  local kind, id = link:match("^(wf%a):(.+)$")
  if not kind then return end
  GameTooltip:SetOwner(self, "ANCHOR_CURSOR")
  if kind == "wfw" then
    local w = guide.words[tonumber(id)]
    if not w then return end
    GameTooltip:AddLine(w.label, 1, 0.82, 0)
    GameTooltip:AddLine(w.text, 1, 1, 1, true)
  elseif kind == "wfs" then
    local s = guide.spells[id]
    if not s then return end
    GameTooltip:AddLine(Icon(s.icon, 18) .. s.name, 1, 0.82, 0)
    GameTooltip:AddLine(("%s · from level %d"):format(s.type or guide.abilityWord, s.lv or 1), 0.6, 0.6, 0.6)
    if s.text then GameTooltip:AddLine(s.text, 1, 1, 1, true) end
  elseif kind == "wfp" then
    GameTooltip:AddLine("Point the arrow here", 1, 0.82, 0)
    GameTooltip:AddLine(TomTom and "Click to set the TomTom arrow to this spot." or "Install TomTom (on the website's must-have list) to get an arrow.", 1, 1, 1, true)
  end
  GameTooltip:Show()
end
local function LinkLeave() GameTooltip:Hide() end
local function LinkClick(_, link)
  local kind, id = link:match("^(wf%a):(.+)$")
  if kind == "wfp" and currentStep then
    local p = currentStep.pins and currentStep.pins[tonumber(id)]
    if p then ArrowTo(p, currentStep) end
  end
end
local function Linkable(frame)
  if not frame.SetHyperlinksEnabled then return end
  frame:SetHyperlinksEnabled(true)
  frame:SetScript("OnHyperlinkEnter", LinkEnter)
  frame:SetScript("OnHyperlinkLeave", LinkLeave)
  frame:SetScript("OnHyperlinkClick", LinkClick)
end
Linkable(content)

------------------------------------------------------------------------
-- What's inside the scroll area
------------------------------------------------------------------------

-- Objectives heading + one row with a tick box per objective (Quest Guide)
local todoHead = content:CreateFontString(nil, "OVERLAY", "GameFontNormal")
todoHead:SetJustifyH("LEFT")

local rows = {}
local function TodoRow(n)
  if rows[n] then return rows[n] end
  local r = CreateFrame("Frame", nil, content)
  Linkable(r)
  local check = CreateFrame("CheckButton", nil, r, "UICheckButtonTemplate")
  check:SetSize(22, 22)
  check:SetPoint("TOPLEFT", -4, 3)
  check:SetScript("OnClick", function(self)
    local t = gdb.ticks[gdb.step] or {}
    t[n] = self:GetChecked() and true or nil
    gdb.ticks[gdb.step] = next(t) and t or nil
    Render()
  end)
  local fs = r:CreateFontString(nil, "OVERLAY", "GameFontHighlight")
  fs:SetPoint("TOPLEFT", 22, -1)
  fs:SetJustifyH("LEFT")
  fs:SetSpacing(2)
  r.check, r.text = check, fs
  rows[n] = r
  return r
end

-- level picker (Action Bars tab)
local picker = CreateFrame("Frame", nil, content)
picker:SetSize(200, 22)
local minus = CreateFrame("Button", nil, picker, "UIPanelButtonTemplate")
minus:SetSize(26, 20)
minus:SetPoint("LEFT")
minus:SetText("-")
local pickerText = picker:CreateFontString(nil, "OVERLAY", "GameFontNormal")
pickerText:SetPoint("LEFT", minus, "RIGHT", 8, 0)
pickerText:SetWidth(70)
local plus = CreateFrame("Button", nil, picker, "UIPanelButtonTemplate")
plus:SetSize(26, 20)
plus:SetPoint("LEFT", pickerText, "RIGHT", 8, 0)
plus:SetText("+")
local mine = CreateFrame("Button", nil, picker, "UIPanelButtonTemplate")
mine:SetSize(70, 20)
mine:SetPoint("LEFT", plus, "RIGHT", 8, 0)
mine:SetText("My level")
minus:SetScript("OnClick", function() barsLevel = math.max(1, (barsLevel or MyLevel()) - 1) Render() end)
plus:SetScript("OnClick", function() barsLevel = math.min(60, (barsLevel or MyLevel()) + 1) Render() end)
mine:SetScript("OnClick", function() barsLevel = nil Render() end)

-- everything else is one text block
local body = content:CreateFontString(nil, "OVERLAY", "GameFontHighlight")
body:SetJustifyH("LEFT")
body:SetSpacing(3)

------------------------------------------------------------------------
-- Pages
------------------------------------------------------------------------

local function Section(text, heading, part)
  if not part or part == "" then return text end
  if text ~= "" then text = text .. "\n\n" end
  return text .. (heading and (GREEN .. heading .. "|r\n") or "") .. part
end

local function SpellLink(id)
  local s = guide.spells[id]
  if not s then return id end
  return Icon(s.icon) .. GOLD .. "|Hwfs:" .. id .. "|h" .. s.name .. "|h|r"
end

-- Quest Guide: everything under the objectives
local function GuideText(s, i)
  local text = ""

  local quests = QuestLogStatus(s.quests)
  if #quests > 0 then
    local lines = {}
    for _, qst in ipairs(quests) do
      local line = (qst.ready and (GREEN .. "Ready to hand in:|r ") or (GOLD .. "In your quest log:|r ")) .. qst.name
      if not qst.ready and #qst.objectives > 0 then line = line .. "\n      " .. table.concat(qst.objectives, "\n      ") end
      lines[#lines + 1] = line
    end
    text = Section(text, nil, table.concat(lines, "\n"))
  end

  local done = ""
  if s.done then done = GOLD .. "Done when:|r " .. s.done end
  if s.stuck then done = done .. (done ~= "" and "\n" or "") .. ORANGE .. "Still short of the level?|r " .. s.stuck end
  text = Section(text, nil, done)

  if (s.pins and #s.pins > 0) or s.mapNotes then
    local lines = {}
    for n, p in ipairs(s.pins or {}) do
      local label = p.label or p.zone
      if p.zone ~= s.pins[1].zone then label = label .. GREY .. " (" .. p.zone .. ")|r" end
      lines[#lines + 1] = ("%s|Hwfp:%d|h%s, %s|h|r  %s"):format(KEY, n, p.x, p.y, label)
    end
    for _, note in ipairs(s.mapNotes or {}) do lines[#lines + 1] = GREY .. note .. "|r" end
    local zone = s.pins and s.pins[1] and s.pins[1].zone
    if s.pins and #s.pins > 0 then lines[#lines + 1] = GREY .. "Click a spot to point the arrow there.|r" end
    text = Section(text, "Map" .. (zone and (": " .. zone) or ""), table.concat(lines, "\n"))
  end

  if s.bars then
    local lines = {}
    for _, r in ipairs(s.bars.rows or {}) do
      local line = SpellLink(r.id)
      if r.at then line = line .. GREY .. " (at level " .. r.at .. ")|r" end
      line = line .. "  " .. r.where
      if r.replaces then line = line .. GREY .. ", replaces " .. r.replaces .. "|r" end
      lines[#lines + 1] = line
    end
    for _, note in ipairs(s.bars.notes or {}) do lines[#lines + 1] = GREY .. note .. "|r" end
    text = Section(text, s.bars.head, table.concat(lines, "\n"))
  end

  if s.talents and #s.talents > 0 then
    text = Section(text, "Talents for these levels (press " .. KEY .. "N|r" .. GREEN .. ")", table.concat(s.talents, "\n"))
  end

  if s.tip then text = Section(text, nil, GOLD .. "Tip:|r " .. s.tip) end

  local level = MyLevel()
  if level > (s.hi or 1) + 2 then
    text = Section(text, nil, ORANGE .. "You're level " .. level .. ", past this step. Open |cffffd200Menu|r" .. ORANGE .. " and click |cffffd200Go to my level|r" .. ORANGE .. ".|r")
  end
  return text
end

local function KeyName(bar, key, n)
  if bar.id == "main" then return KEY .. key .. "|r" end
  if bar.id == "shift" then return KEY .. "Shift + " .. key:sub(2) .. "|r" end
  if bar.id == "alt" then return KEY .. "Alt + " .. key:sub(2) .. "|r" end
  return KEY .. "Button " .. n .. "|r"
end
local function SpellIn(slot, level)
  local id
  for _, use in ipairs(slot.uses) do if level >= use[1] then id = use[2] end end
  return id
end

-- Action Bars tab, as on the website: every bar at a level, and what changes at that level
local function BarsText(level)
  local text = guide.pages.barsIntro or ""
  local changes = {}
  for _, b in ipairs(guide.bars) do
    local lines = { GREY .. (b.how or "") .. "|r" }
    for n, slot in ipairs(b.slots) do
      local id = SpellIn(slot, level)
      if id then
        local new = false
        for k, use in ipairs(slot.uses) do
          if use[1] == level then
            new = true
            local before = slot.uses[k - 1]
            changes[#changes + 1] = "Put " .. SpellLink(use[2]) .. " on " .. KeyName(b, slot.key, n)
              .. (before and (GREY .. " (replaces " .. guide.spells[before[2]].name .. ")|r") or "") .. "."
          end
        end
        lines[#lines + 1] = KeyName(b, slot.key, n) .. "   " .. SpellLink(id) .. (new and (GREEN .. "  new|r") or "")
      end
    end
    text = Section(text, b.title, table.concat(lines, "\n"))
  end
  if #changes == 0 then
    changes[1] = GREY .. "Nothing new for your bars at level " .. level .. "." .. (level % 2 == 0 and " Still visit the trainer for new ranks." or "") .. "|r"
  end
  text = Section(text, "What to change at level " .. level, "•  " .. table.concat(changes, "\n•  "))
  return Section(text, nil, guide.pages.barsSetup)
end

-- Talents tab
local function TalentsText()
  local level = MyLevel()
  local first = guide.talents[1] and guide.talents[1].lo or 10
  local now
  for _, t in ipairs(guide.talents) do if t.lo <= level and level <= t.hi then now = t end end
  local note
  if level < first then
    note = ("%sYou're level %d.|r Your first talent point comes at level %d: come back then."):format(GOLD, level, first)
  elseif now then
    note = ("%sYou're level %d.|r Your talent right now: %s%s|r (marked below)."):format(GOLD, level, GREEN, Plain(now.name))
  else
    note = ("%sYou're level %d.|r"):format(GOLD, level)
  end
  local lines = {}
  for _, t in ipairs(guide.talents) do
    local line
    if t == now then
      line = GREEN .. "> " .. t.lv .. "   " .. Plain(t.name) .. "|r\n      " .. WHITE .. t.how .. "|r" .. (t.why and ("\n      " .. t.why) or "")
    elseif t.hi < level then
      line = GREY .. t.lv .. "   " .. Plain(t.name) .. "  (done)|r"
    else
      line = GOLD .. t.lv .. "|r   " .. t.name .. "\n      " .. GREY .. t.how .. "|r" .. (t.why and ("\n      " .. t.why) or "")
    end
    lines[#lines + 1] = line
  end
  local text = Section(guide.pages.talentsIntro or "", nil, note)
  text = Section(text, nil, table.concat(lines, "\n"))
  return Section(text, nil, GREY .. Plain(guide.pages.talentsHint) .. "|r")
end

-- Words tab
local function WordsText()
  local lines = {}
  for _, w in ipairs(guide.words) do
    if not w.hide then lines[#lines + 1] = GOLD .. w.label .. "|r\n" .. w.text end
  end
  return table.concat(lines, "\n\n")
end

------------------------------------------------------------------------
-- Drawing
------------------------------------------------------------------------

local back = CreateFrame("Button", nil, f, "UIPanelButtonTemplate")
back:SetSize(80, 22)
back:SetPoint("BOTTOMLEFT", PAD, PAD - 2)
back:SetText("< Back")

local nextBtn = CreateFrame("Button", nil, f, "UIPanelButtonTemplate")
nextBtn:SetSize(120, 22)
nextBtn:SetPoint("BOTTOMRIGHT", -PAD, PAD - 2)
nextBtn:SetText("Next >")

local menuBtn = CreateFrame("Button", nil, f, "UIPanelButtonTemplate")
menuBtn:SetSize(70, 22)
menuBtn:SetPoint("LEFT", back, "RIGHT", 8, 0)
menuBtn:SetText("Menu")

local RefreshMenu   -- set once the menu exists

-- lays out the scroll area at a given width; returns its height
local function Layout(inner, s)
  local y = 0
  for _, r in ipairs(rows) do r:Hide() end
  todoHead:Hide()
  picker:Hide()

  if tab == "guide" then
    local ticks = gdb.ticks[gdb.step] or {}
    local got = 0
    for n in pairs(ticks) do if n <= #s.todo then got = got + 1 end end
    todoHead:ClearAllPoints()
    todoHead:SetPoint("TOPLEFT", content, "TOPLEFT", 0, 0)
    todoHead:SetText("Objectives   " .. (got > 0 and (got == #s.todo and GREEN or GREY) .. got .. " of " .. #s.todo .. " done|r"
      or GREY .. "Tick each one off as you go|r"))
    todoHead:Show()
    y = y + todoHead:GetStringHeight() + 6
    for n, t in ipairs(s.todo) do
      local r = TodoRow(n)
      r:ClearAllPoints()
      r:SetPoint("TOPLEFT", content, "TOPLEFT", 0, -y)
      r.text:SetWidth(inner - 22)
      r.text:SetText(t)
      local on = ticks[n] and true or false
      r.check:SetChecked(on)
      r.text:SetAlpha(on and 0.5 or 1)
      local h = math.max(20, r.text:GetStringHeight() + 4)
      r:SetSize(inner, h)
      r:Show()
      y = y + h + 4
    end
    y = y + 6
  elseif tab == "bars" then
    picker:ClearAllPoints()
    picker:SetPoint("TOPLEFT", content, "TOPLEFT", 0, 0)
    pickerText:SetText("Level " .. (barsLevel or MyLevel()))
    picker:Show()
    y = y + 30
  end

  body:ClearAllPoints()
  body:SetPoint("TOPLEFT", content, "TOPLEFT", 0, -y)
  body:SetWidth(inner)
  return y + body:GetStringHeight()
end

function Render()
  if not guide then return end
  local steps = guide.steps
  gdb.step = math.max(1, math.min(gdb.step or 1, #steps))
  local i = gdb.step
  local s = steps[i]
  currentStep = s

  for _, b in ipairs(tabButtons) do
    local on = b.id == tab
    b.line:SetShown(on)
    b.label:SetTextColor(on and 1 or 0.6, on and 0.82 or 0.6, on and 0 or 0.6)
  end

  progress:SetValue(i / #steps)
  progressText:SetText(("Level %s  ·  Guide step %d / %d"):format(s.lv, i, #steps))

  local text
  if tab == "guide" then
    local k = KINDS[s.kind] or {}
    local chapter = guide.chapters[s.chapter]
    meta:SetText(Icon(k.icon, 14) .. GOLD .. (k.label or "") .. "|r   " .. GREY .. "·|r   " .. (s.place or "")
      .. (chapter and ("   " .. GREY .. "·   " .. chapter.name .. "|r") or ""))
    title:SetText(s.title or "")
    text = GuideText(s, i)
  elseif tab == "bars" then
    local level = barsLevel or MyLevel()
    meta:SetText(GREY .. "Where every " .. guide.abilityWord:lower() .. " goes, level by level|r")
    title:SetText("Action Bars")
    text = BarsText(level)
  elseif tab == "play" then
    meta:SetText(GREY .. guide.name .. "|r")
    title:SetText("How to Play")
    text = guide.pages.play or ""
  elseif tab == "talents" then
    meta:SetText(GREY .. "One talent point every level from 10|r")
    title:SetText("Talents")
    text = TalentsText()
  else
    meta:SetText(GREY .. "Hover a purple word anywhere in the guide to see it|r")
    title:SetText("Words Explained")
    text = WordsText()
  end
  body:SetText(text)

  -- Back / Next, like the site: "All done · Next" when every objective is ticked
  back:SetEnabled(i > 1)
  local ticks = gdb.ticks[i] or {}
  local got = 0
  for n in pairs(ticks) do if n <= #s.todo then got = got + 1 end end
  local all = got >= #s.todo
  if i == #steps then
    nextBtn:SetText("Finished!")
    nextBtn:SetEnabled(false)
    nextBtn:UnlockHighlight()
  else
    nextBtn:SetEnabled(true)
    nextBtn:SetText(all and "All done · Next >" or "Next >")
    if all then nextBtn:LockHighlight() else nextBtn:UnlockHighlight() end
  end

  -- grow with the content up to MAX_HEIGHT, then scroll
  local headH = 30 + 13 + 8 + meta:GetStringHeight() + 4 + title:GetStringHeight() + 8
  local inner = WIDTH - PAD * 2
  local h = Layout(inner, s)
  local scroll = headH + h + BOTTOM > MAX_HEIGHT
  if scroll then
    inner = inner - 12                       -- room for the scroll bar
    h = Layout(inner, s)
  end
  content:SetSize(inner, math.max(1, math.ceil(h)))
  sf:SetPoint("RIGHT", f, "RIGHT", -(WIDTH - PAD - inner), 0)

  local boxH = scroll and MAX_HEIGHT or math.ceil(headH + h + BOTTOM)
  f:SetHeight(boxH)
  if scroll then
    local view = boxH - headH - BOTTOM
    bar:SetMinMaxValues(0, math.max(0, h - view))
    bar.thumb:SetHeight(math.max(24, view * view / h))
    bar:Show()
  else
    bar:SetMinMaxValues(0, 0)
    bar:Hide()
  end

  if shownStep ~= i then
    shownStep = i
    bar:SetValue(0)                          -- a new step starts at the top
    sf:SetVerticalScroll(0)
    SetArrow(s)
  end
  if RefreshMenu then RefreshMenu() end
end

function SetTab(id)
  tab = id
  if id == "bars" then barsLevel = nil end
  bar:SetValue(0)
  sf:SetVerticalScroll(0)
  Render()
end

local function Go(i)
  gdb.step = i
  if tab ~= "guide" then tab = "guide" end
  Render()
end

back:SetScript("OnClick", function() Go(gdb.step - 1) end)
nextBtn:SetScript("OnClick", function() Go(gdb.step + 1) end)

local function Place()
  f:ClearAllPoints()
  local p = db.pos
  if p then f:SetPoint(p[1], UIParent, p[2], p[3], p[4])
  else f:SetPoint("RIGHT", UIParent, "RIGHT", -60, 60) end
  f:SetScale(db.scale or 1)
end

local function ShowBox()
  db.hidden = false
  f:Show()
  Render()
end

local function ToggleBox()
  if f:IsShown() then f:Hide() db.hidden = true else ShowBox() end
end

local function ToggleArrow()
  db.arrow = not db.arrow
  if db.arrow then shownStep = nil Render() else ClearArrow() end
  if RefreshMenu then RefreshMenu() end
end

local function SetSize(n)
  db.scale = math.floor(math.max(0.6, math.min(1.6, n)) * 10 + 0.5) / 10
  Place()
  if RefreshMenu then RefreshMenu() end
end

local function ResetPlace()
  db.pos = nil
  db.scale = 1
  Place()
  ShowBox()
end

close:SetScript("OnClick", function()
  f:Hide()
  db.hidden = true
  Say("hidden. Click the book button on your minimap to bring it back.")
end)

------------------------------------------------------------------------
-- Menu: settings and every step, grouped by chapter (like "All steps" on the site)
------------------------------------------------------------------------

local MENU_W = 240
local menu = CreateFrame("Frame", nil, f, "BackdropTemplate")
menu:SetSize(MENU_W, MAX_HEIGHT)
menu:SetPoint("TOPRIGHT", f, "TOPLEFT", -4, 0)
menu:SetClampedToScreen(true)
menu:SetFrameLevel(f:GetFrameLevel() + 10)
menu:EnableMouse(true)
menu:SetBackdrop(BACKDROP)
menu:SetBackdropColor(0.04, 0.04, 0.07, 0.96)
menu:SetBackdropBorderColor(0.75, 0.6, 0.3, 1)
menu:Hide()

local function PanelButton(text, w, onClick)
  local b = CreateFrame("Button", nil, menu, "UIPanelButtonTemplate")
  b:SetSize(w, 22)
  b:SetText(text)
  b:SetScript("OnClick", onClick)
  return b
end

local levelBtn, arrowBtn, sizeText, listArea, listBar, listContent
local stepRows = {}

local function BuildMenu()
  local y = -12
  levelBtn = PanelButton("Go to my level", MENU_W - 24, function() Go(StepForLevel(MyLevel())) end)
  levelBtn:SetPoint("TOPLEFT", 12, y)
  y = y - 26

  arrowBtn = PanelButton("", MENU_W - 24, ToggleArrow)
  arrowBtn:SetPoint("TOPLEFT", 12, y)
  y = y - 26

  local sizeLabel = menu:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
  sizeLabel:SetPoint("TOPLEFT", 14, y - 5)
  sizeLabel:SetText("Box size")
  local bigger = PanelButton("+", 26, function() SetSize((db.scale or 1) + 0.1) end)
  bigger:SetPoint("TOPLEFT", 12 + 112, y)
  sizeText = menu:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
  sizeText:SetPoint("LEFT", bigger, "RIGHT", 4, 0)
  sizeText:SetWidth(34)
  local smaller = PanelButton("-", 26, function() SetSize((db.scale or 1) - 0.1) end)
  smaller:SetPoint("RIGHT", bigger, "LEFT", -4, 0)
  local reset = PanelButton("Reset", 50, ResetPlace)
  reset:SetPoint("TOPRIGHT", -12, y)
  y = y - 30

  local head = menu:CreateFontString(nil, "OVERLAY", "GameFontNormal")
  head:SetPoint("TOPLEFT", 14, y)
  head:SetText("All steps (click to jump)")
  y = y - 18

  listArea = CreateFrame("ScrollFrame", nil, menu)
  listArea:SetPoint("TOPLEFT", 12, y)
  listArea:SetPoint("BOTTOMRIGHT", -20, 12)
  listContent = CreateFrame("Frame", nil, listArea)
  listContent:SetSize(MENU_W - 32, 1)
  listArea:SetScrollChild(listContent)
  listBar = NewScrollBar(menu, listArea)
  listBar:ClearAllPoints()
  listBar:SetPoint("TOP", listArea, "TOP", 0, 0)
  listBar:SetPoint("BOTTOM", listArea, "BOTTOM", 0, 0)
  listBar:SetPoint("RIGHT", menu, "RIGHT", -10, 0)
  menu:EnableMouseWheel(true)
  menu:SetScript("OnMouseWheel", function(_, delta) listBar:SetValue(listBar:GetValue() - delta * 48) end)

  local ly = 0
  for i, s in ipairs(guide.steps) do
    local c = guide.chapters[s.chapter]
    if c and c.first == i then
      local ch = listContent:CreateFontString(nil, "OVERLAY", "GameFontNormal")
      ch:SetPoint("TOPLEFT", 2, -ly - (i > 1 and 6 or 0))
      ch:SetText(c.name .. "  " .. GREY .. (c.lo == c.hi and ("Level " .. c.lo) or ("Levels " .. c.lo .. "-" .. c.hi)) .. "|r")
      ly = ly + 18 + (i > 1 and 6 or 0)
    end
    local row = CreateFrame("Button", nil, listContent)
    row:SetSize(MENU_W - 34, 16)
    row:SetPoint("TOPLEFT", 0, -ly)
    row:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight", "ADD")
    local mark = row:CreateTexture(nil, "BACKGROUND")
    mark:SetAllPoints()
    mark:SetColorTexture(1, 0.82, 0, 0.15)
    local lv = row:CreateFontString(nil, "OVERLAY", "GameFontDisableSmall")
    lv:SetPoint("RIGHT", -2, 0)
    lv:SetText(s.lv)
    local name = row:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    name:SetPoint("LEFT", 2, 0)
    name:SetPoint("RIGHT", lv, "LEFT", -4, 0)
    name:SetJustifyH("LEFT")
    name:SetWordWrap(false)
    local k = KINDS[s.kind] or {}
    row.base = ("%d  %s%s"):format(i, Icon(k.icon, 12), Plain(s.title))
    row.label, row.mark, row.top = name, mark, ly
    row:SetScript("OnClick", function() Go(i) end)
    stepRows[i] = row
    ly = ly + 16
  end
  listContent:SetHeight(ly)
end

RefreshMenu = function()
  if not menu:IsShown() then return end
  levelBtn:SetText(("Go to my level (%d)"):format(MyLevel()))
  if TomTom then
    arrowBtn:SetText("TomTom arrow: " .. (db.arrow and "On" or "Off"))
    arrowBtn:SetEnabled(true)
  else
    arrowBtn:SetText("Arrow needs TomTom")
    arrowBtn:SetEnabled(false)
  end
  sizeText:SetText(("%d%%"):format(math.floor((db.scale or 1) * 100 + 0.5)))
  for i, row in ipairs(stepRows) do
    local here = i == gdb.step
    row.mark:SetShown(here)
    row.label:SetText((here and GOLD or (i < gdb.step and GREY or "")) .. row.base .. ((here or i < gdb.step) and "|r" or ""))
  end
  -- scroll the list so the current step shows
  local view = listArea:GetHeight()
  local maxScroll = math.max(0, listContent:GetHeight() - view)
  listBar:SetMinMaxValues(0, maxScroll)
  listBar:SetShown(maxScroll > 0)
  local row = stepRows[gdb.step]
  if row and view > 0 then
    local cur = listBar:GetValue()
    if row.top < cur or row.top + 16 > cur + view then listBar:SetValue(math.min(maxScroll, math.max(0, row.top - view / 2))) end
  end
end

local function ToggleMenu()
  if not levelBtn then BuildMenu() end
  if menu:IsShown() then menu:Hide() else menu:Show() RefreshMenu() end
end
menu:SetScript("OnShow", function() C_Timer.After(0, function() if RefreshMenu then RefreshMenu() end end) end)
menuBtn:SetScript("OnClick", ToggleMenu)

------------------------------------------------------------------------
-- Minimap button: click to show or hide, right-click for the menu
------------------------------------------------------------------------

local mm = CreateFrame("Button", "WowForeverGuideMinimapButton", Minimap)
mm:SetSize(31, 31)
mm:SetFrameStrata("MEDIUM")
mm:SetFrameLevel(8)
mm:SetHighlightTexture("Interface\\Minimap\\UI-Minimap-ZoomButton-Highlight")
mm:RegisterForClicks("LeftButtonUp", "RightButtonUp")
mm:RegisterForDrag("LeftButton")
mm:Hide()
local mmIcon = mm:CreateTexture(nil, "BACKGROUND")
mmIcon:SetTexture("Interface\\Icons\\INV_Misc_Book_09")
mmIcon:SetSize(20, 20)
mmIcon:SetPoint("TOPLEFT", 7, -5)
local mmBorder = mm:CreateTexture(nil, "OVERLAY")
mmBorder:SetTexture("Interface\\Minimap\\MiniMap-TrackingBorder")
mmBorder:SetSize(53, 53)
mmBorder:SetPoint("TOPLEFT")

local function PlaceMinimapButton()
  local a = math.rad(db.minimapAngle or 210)
  local r = (Minimap:GetWidth() / 2) + 10
  mm:ClearAllPoints()
  mm:SetPoint("CENTER", Minimap, "CENTER", math.cos(a) * r, math.sin(a) * r)
end

mm:SetScript("OnClick", function(_, button)
  if button == "RightButton" then
    if not f:IsShown() then ShowBox() end
    ToggleMenu()
  else
    ToggleBox()
  end
end)
mm:SetScript("OnDragStart", function(self)
  self:SetScript("OnUpdate", function()
    local mx, my = Minimap:GetCenter()
    local cx, cy = GetCursorPosition()
    local scale = Minimap:GetEffectiveScale()
    db.minimapAngle = math.deg(math.atan2(cy / scale - my, cx / scale - mx))
    PlaceMinimapButton()
  end)
end)
mm:SetScript("OnDragStop", function(self) self:SetScript("OnUpdate", nil) end)
mm:SetScript("OnEnter", function(self)
  GameTooltip:SetOwner(self, "ANCHOR_LEFT")
  GameTooltip:AddLine("WoW Forever Guide " .. GREY .. (WowForeverGuide_Version or "") .. "|r")
  if guide then GameTooltip:AddLine(guide.name .. ", step " .. gdb.step .. " of " .. #guide.steps, 0.8, 0.8, 0.8) end
  GameTooltip:AddLine("Click: show or hide the guide", 1, 1, 1)
  GameTooltip:AddLine("Right-click: menu", 1, 1, 1)
  GameTooltip:AddLine("Drag: move this button", 0.7, 0.7, 0.7)
  GameTooltip:Show()
end)
mm:SetScript("OnLeave", function() GameTooltip:Hide() end)

------------------------------------------------------------------------
-- /wf still works for people who like typing
------------------------------------------------------------------------

SLASH_WOWFOREVERGUIDE1 = "/wf"
SLASH_WOWFOREVERGUIDE2 = "/wfguide"
SlashCmdList.WOWFOREVERGUIDE = function(msg)
  if not guide then Say("there's no guide for your class yet. There are guides for: Gnome Mage, Night Elf Rogue.") return end
  local cmd, arg = (msg or ""):lower():match("^%s*(%S*)%s*(.-)%s*$")
  if cmd == "" then ToggleBox()
  elseif cmd == "next" then Go(gdb.step + 1) ShowBox()
  elseif cmd == "back" then Go(gdb.step - 1) ShowBox()
  elseif cmd == "level" then Go(StepForLevel(MyLevel())) ShowBox()
  elseif tonumber(cmd) then Go(math.floor(tonumber(cmd) or 1)) ShowBox()
  elseif cmd == "arrow" then ToggleArrow()
  elseif cmd == "size" and tonumber(arg) then SetSize(tonumber(arg) or 1)
  elseif cmd == "reset" then ResetPlace()
  else ShowBox() ToggleMenu() end
end

------------------------------------------------------------------------
-- Start up
------------------------------------------------------------------------

local function PickGuide()
  local _, class = UnitClass("player")
  local _, race = UnitRace("player")
  local byClass
  for _, g in pairs(WowForeverGuide_Guides or {}) do
    if g.class == class then
      if g.race == race then return g end
      byClass = byClass or g
    end
  end
  return byClass
end

local pending = false
local function RenderSoon()   -- the quest log fires many events at once
  if pending or not f:IsShown() then return end
  pending = true
  C_Timer.After(0.3, function() pending = false if f:IsShown() then Render() end end)
end

local ev = CreateFrame("Frame")
ev:RegisterEvent("ADDON_LOADED")
ev:RegisterEvent("PLAYER_LOGIN")
ev:RegisterEvent("PLAYER_LEVEL_UP")
ev:RegisterEvent("QUEST_LOG_UPDATE")
ev:SetScript("OnEvent", function(_, event, arg1)
  if event == "ADDON_LOADED" and arg1 == ADDON then
    WowForeverGuideCharDB = WowForeverGuideCharDB or {}
    db = WowForeverGuideCharDB
    if db.arrow == nil then db.arrow = true end
    db.guides = db.guides or {}
  elseif event == "PLAYER_LOGIN" then
    guide = PickGuide()
    if not guide then return end
    local fresh = db.guides[guide.id] == nil and db.step == nil
    gdb = db.guides[guide.id] or {}
    db.guides[guide.id] = gdb
    if db.step then gdb.step = gdb.step or db.step db.step = nil end   -- from version 0.1
    gdb.ticks = gdb.ticks or {}
    if not gdb.step then gdb.step = StepForLevel(MyLevel()) end
    PlaceMinimapButton()
    mm:Show()
    Place()
    if fresh then
      Say("welcome! This is the website's " .. guide.name .. " guide, step by step. Drag the box to move it. The book button on your minimap shows or hides it.")
    end
    if not db.hidden then ShowBox() end
  elseif not guide then
    return
  elseif event == "PLAYER_LEVEL_UP" then
    C_Timer.After(0.5, function() if f:IsShown() then Render() end end)   -- UnitLevel updates a moment later
  elseif event == "QUEST_LOG_UPDATE" and tab == "guide" then
    RenderSoon()
  end
end)
