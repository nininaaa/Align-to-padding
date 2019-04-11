import sketch from "sketch";
import main from "./main";

export default function() {
  var document = sketch.getSelectedDocument();
  var selectedLayers = document.selectedLayers;

  var run = main().run();

  if (run.complete === true) {
    var lastLayerWidth = run.lastLayer.frame.width;
    selectedLayers.forEach(item => {
      item.frame.x = run.lastLayer.frame.x + Number(run.padding[3]);
      item.frame.width =
        lastLayerWidth - (Number(run.padding[1]) + Number(run.padding[3]));
    });
    run.group.adjustToFit();
  }
}
