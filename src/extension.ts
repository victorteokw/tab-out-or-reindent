import {
  commands, ExtensionContext, Range, Selection, Position, TextEditor
} from 'vscode';

export function activate(context: ExtensionContext) {

  let disposable = commands.registerTextEditorCommand(
    'tabOutOrReindent',
    (editor: TextEditor) => {
      let selCount = 0, thingAtPoint = [];
      for (const sel of editor.selections) {
        const next = new Position(sel.active.line, sel.active.character + 1);
        thingAtPoint.push(editor.document.getText(new Range(sel.active, next)));
        if (!sel.isEmpty) {
          selCount++;
        }
      }
      if (selCount !== 0) {
        commands.executeCommand('editor.action.reindentselectedlines');
      } else if (selCount === 0) {
        let jumpable: boolean[] = [], allNotJumpable = true;
        for (const thing of thingAtPoint) {
          const j = ['\'', '"', '`', ')', ']', '}', '>', '|'].includes(thing);
          jumpable.push(j);
          if (j) {
            allNotJumpable = false;
          }
        }
        if (allNotJumpable) {
          commands.executeCommand('editor.action.reindentselectedlines')
            .then(() => {
              // this is working around with reindent lines bug of vscode
              // remove all wrongly created selections
              editor.selections = editor.selections.map((sel) => {
                const index = editor.document.lineAt(sel.active)
                  .firstNonWhitespaceCharacterIndex;
                if (index > sel.active.character) {
                  const pos = new Position(sel.active.line, index);
                  return new Selection(pos, pos);
                } else {
                  return new Selection(sel.active, sel.active);
                }
              });
            });
        } else {
          editor.selections = editor.selections.map((sel, index) => {
            if (jumpable[index]) {
              const pos = new Position(
                sel.active.line,
                sel.active.character + 1
              );
              return new Selection(pos, pos);
            } else {
              return sel;
            }
          });
        }
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
