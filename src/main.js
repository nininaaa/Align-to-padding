import sketch from "sketch";

export default function() {
  var document = sketch.getSelectedDocument();
  var selectedLayers = document.selectedLayers;
  var selectedCount = selectedLayers.length;
  var UI = require("sketch/ui");
  var validElements = true;
  var group = null;
  var lastLayer = null;
  var padding = [];
  var string = null;
  var message = "Enter padding eg: 12 or 12 12 12 12";
  var complete = true;

  var run = () => {
    if (selectedCount === 0) {
      UI.message("Select a layer");
      validElements = false;
      return;
    }

    selectedLayers.forEach(item => {
      if (item.parent.type !== "Group") {
        UI.message("Select a layer in a Group");
        validElements = false;
        return;
      }

      if (item.parent.type === "Group" && item.parent.layers.length < 2) {
        UI.message("Need to create at least 2 layers");
        validElements = false;
        return;
      }

      item.parent.layers.forEach((i, index) => {
        if (item.id === i.id) {
          if (index === 0) {
            UI.message("Can't select the bottom layer");
            validElements = false;
            return;
          }
        }
      });

      if (validElements) {
        var paddingCorrect = false;
        lastLayer = item.parent.layers[0];
        string = lastLayer.name;
        padding = lastLayer.name.split(" ");
        group = lastLayer.parent;

        while (!paddingCorrect) {
          var onlyNumbers = /(^[0-9 ]*$)/g;
          var separateNums = /([0-9]+)/g;
          var otherCharacters = /[^0-9 ]/g;
          var whiteSpace = /\s+/g;
          var bigNumber = /([0-9]{4,})/g;

          if (
            string.match(onlyNumbers) &&
            string.match(separateNums).length === 4 &&
            string.match(bigNumber) == null
          ) {
            paddingCorrect = true;
            return;
          }

          var inputValidation = () => {
            if (
              string.match(onlyNumbers) &&
              string.match(separateNums).length === 4 &&
              string.match(bigNumber) == null
            ) {
              paddingCorrect = true;
              lastLayer.name = string.replace(whiteSpace, " ");
              padding = lastLayer.name.split(" ");
            }

            if (
              string.match(onlyNumbers) &&
              string.match(separateNums).length === 1 &&
              string.match(bigNumber) == null
            ) {
              paddingCorrect = true;
              var firstNum = string.match(separateNums)[0];

              lastLayer.name =
                firstNum + " " + firstNum + " " + firstNum + " " + firstNum;

              padding = lastLayer.name.split(" ");
            }

            if (
              string.match(onlyNumbers) &&
              string.match(separateNums).length === 2 &&
              string.match(bigNumber) == null
            ) {
              paddingCorrect = true;
              var firstNum = string.match(separateNums)[0];
              var secondNum = string.match(separateNums)[1];
              lastLayer.name =
                firstNum + " " + secondNum + " " + firstNum + " " + secondNum;
              padding = lastLayer.name.split(" ");
            }

            if (
              string.match(onlyNumbers) &&
              string.match(separateNums).length === 3 &&
              string.match(bigNumber) == null
            ) {
              paddingCorrect = true;
              var firstNum = string.match(separateNums)[0];
              var secondNum = string.match(separateNums)[1];
              var thirdNum = string.match(separateNums)[2];

              lastLayer.name =
                firstNum + " " + secondNum + " " + thirdNum + " " + secondNum;
              padding = lastLayer.name.split(" ");
            }

            if (string.match(bigNumber) != null) {
              message = "Maximum of 3 digits for each padding";
            }

            if (
              string.match(onlyNumbers) &&
              string.match(separateNums).length > 4
            ) {
              message = "Enter 4 numbers or less";
            }

            if (string.match(otherCharacters)) {
              message = "Enter numbers only";
            }

            if (string === "null") {
              paddingCorrect = true;
            }
          };

          UI.getInputFromUser(
            message,
            {
              initialValue: string
            },
            (err, value) => {
              if (err) {
                paddingCorrect = true;
                complete = false;
                return;
              }
              string = value;
              inputValidation();
            }
          );
        }
      }
    });
    return { complete, padding, lastLayer, group };
  };

  return { run };
}
