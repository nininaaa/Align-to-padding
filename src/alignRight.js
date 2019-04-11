import sketch from "sketch";
import main from "./main";

export default function() {
  var document = sketch.getSelectedDocument();
  var selectedLayers = document.selectedLayers;

  var run = main().run();

  if (run.complete === true) {
    var lastLayerWidth = run.lastLayer.frame.width;
    selectedLayers.forEach(item => {
      if (run.lastLayer.frame.x > item.frame.x) {
        item.frame.x =
          lastLayerWidth -
          (item.frame.x - run.lastLayer.frame.x) -
          item.frame.width -
          Number(run.padding[1]);
      } else {
        item.frame.x =
          lastLayerWidth - item.frame.width - Number(run.padding[1]);
      }
    });
    run.group.adjustToFit();
  }
}
