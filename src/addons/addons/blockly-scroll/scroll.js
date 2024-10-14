export default async function ({ addon }) {
  const Blockly = await addon.tab.traps.getBlockly();

  function update() {
    if (addon.tab.editorMode !== "editor") return;

    const speed = addon.settings.get("selectSpeed");
    const speeds = {
      none: 0,
      veryfast: 0.1,
      fast: 0.2,
      default: 0.3,
      long: 0.5,
      verylong: 1,
    };

    const flyout = Blockly.Flyout.prototype;
    flyout.scrollAnimationFraction = speeds[speed] ?? 0.3;
  }

  addon.settings.addEventListener("change", update);
  while (true) {
    await addon.tab.waitForElement(".blocklyScrollbarHandle", {
      markAsSeen: true,
      reduxCondition: (state) => !state.scratchGui.mode.isPlayerOnly,
    });
    update();
  }
}
