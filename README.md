# Tab Out or Reindent

Press tab to jump out pair or reindent current line, or reindent selection.
Multiple cursors are supported.

Please add the following into `keybindings.json`.

```json
{
  "key": "tab",
  "command": "tabOutOrReindent",
  "when": "editorTextFocus && !editorReadonly && !editorTabMovesFocus && !suggestWidgetVisible && !inSnippetMode"
},
```

## Need Help?

Open an issue [here](https://github.com/zhangkaiyulw/tab-out-or-reindent/issues).

## License

[MIT](https://github.com/zhangkaiyulw/tab-out-or-reindent/blob/master/LICENSE) @ Victor Zhang
