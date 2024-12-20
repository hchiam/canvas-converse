import { CanvasConverse } from "./script.js";
import { NaivePhysics } from "./naivePhysics.js";
const $ = (s) => document.querySelector(s);

class DocumentationGenerator {
  constructor(input = { classRef: null, print: false }) {
    this.print = input.print;
    this.classRef = input.classRef;
  }

  getMethods(yourClassHere = this.classRef) {
    const methods = Object.getOwnPropertyNames(yourClassHere.prototype)
      .filter((m) => typeof yourClassHere.prototype[m] === "function")
      .map((m) => {
        const method = yourClassHere.prototype[m];
        const methodString = method.toString();
        const params = methodString.slice(
          methodString.indexOf("(") + 1,
          methodString.indexOf(")")
        );
        return `\`\`\`js\n${m}(${params.trim()})\n\`\`\``;
      });

    if (this.print) {
      console.log(`${yourClassHere.name} methods:`, methods);
    }

    return methods;
  }

  getProperties(yourClassHere = this.classRef) {
    const properties = Object.entries(
      new yourClassHere({ generatingDocumentation: true }) // because must call new () instance to get "this." variables
    ).map((entry) => {
      const [key, value] = entry;
      return `\`${key}\`: ${typeof value}`;
    });

    if (this.print) {
      console.log(`${yourClassHere.name} properties:`, properties);
    }

    return properties;
  }

  generateDocumentation(yourClassHere = this.classRef) {
    const methods = this.getMethods(yourClassHere).join("\n\n");
    const properties = this.getProperties(yourClassHere).join("\n\n");

    const date = new Date();
    const yyyy = date.getFullYear();
    const MM = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    let content = `# ${yourClassHere.name} Documentation

(Generated from generateDocumentation.js to clipboard - ${yyyy}/${MM}/${dd}th.)

`;
    if (methods) {
      content += `## Methods

${methods}

`;
    }

    if (properties) {
      content += `## Properties

${properties}
`;
    }

    if (this.print) {
      console.log(`${yourClassHere.name} Documentation:`, content);
    }

    return content;
  }
}

const docGenerator1 = new DocumentationGenerator({ classRef: CanvasConverse });
const documentation1 = docGenerator1.generateDocumentation();
const docGenerator2 = new DocumentationGenerator({ classRef: NaivePhysics });
const documentation2 = docGenerator2.generateDocumentation();
// console.log(documentation);

// window.copyDoc = function () {
//   copy(documentation);
// };
$("#copyDoc").addEventListener("click", () => {
  copy(documentation1 + "\n" + documentation2);
});

function copy(text) {
  var textarea = document.createElement("textarea");
  //   selection = document.getSelection();
  textarea.textContent = text;
  document.body.appendChild(textarea);
  //   selection.removeAllRanges();
  textarea.select();
  document.execCommand("copy");
  //   selection.removeAllRanges();
  document.body.removeChild(textarea);
  alert(`Copied to clipboard:\n\n${text}`);
}
