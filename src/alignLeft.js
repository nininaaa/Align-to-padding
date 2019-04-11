import sketch from "sketch";
import main from "./main";

export default function() {
  var document = sketch.getSelectedDocument();
  var selectedLayers = document.selectedLayers;

  var run = main().run();

  if (run.complete === true) {
    selectedLayers.forEach(item => {
      item.frame.x = run.lastLayer.frame.x + Number(run.padding[3]);
    });
    run.group.adjustToFit();
  }
}
