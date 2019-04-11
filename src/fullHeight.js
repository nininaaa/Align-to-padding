import sketch from "sketch";
import main from "./main";

export default function() {
  var document = sketch.getSelectedDocument();
  var selectedLayers = document.selectedLayers;

  var run = main().run();

  if (run.complete === true) {
    var lastLayerHeight = run.lastLayer.frame.height;
    selectedLayers.forEach(item => {
      item.frame.y = run.lastLayer.frame.y + Number(run.padding[0]);
      item.frame.height =
        lastLayerHeight - (Number(run.padding[0]) + Number(run.padding[2]));
    });
    run.group.adjustToFit();
  }
}
