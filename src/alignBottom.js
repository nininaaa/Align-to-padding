import sketch from "sketch";
import main from "./main";

export default function() {
  var document = sketch.getSelectedDocument();
  var selectedLayers = document.selectedLayers;

  var run = main().run();

  if (run.complete === true) {
    var lastLayerHeight = run.lastLayer.frame.height;
    selectedLayers.forEach(item => {
      if (run.lastLayer.frame.y > item.frame.y) {
        item.frame.y =
          lastLayerHeight -
          (item.frame.y - run.lastLayer.frame.y) -
          item.frame.height -
          Number(run.padding[2]);
      } else {
        item.frame.y =
          lastLayerHeight - item.frame.height - Number(run.padding[2]);
      }
    });
    run.group.adjustToFit();
  }
}
