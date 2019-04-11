import sketch from "sketch";
import main from "./main";

export default function() {
  var document = sketch.getSelectedDocument();
  var selectedLayers = document.selectedLayers;

  var run = main().run();

  if (run.complete === true) {
    selectedLayers.forEach(item => {
      item.frame.y = run.lastLayer.frame.y + Number(run.padding[0]);
    });
    run.group.adjustToFit();
  }
}
