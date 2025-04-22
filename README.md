# Clipboard Regex Replacer

A Chrome extension that monitors clipboard content and applies regex replacement rules. Perfect for automatically modifying copied text according to your custom patterns.

## Features

- 🔍 Monitors clipboard changes in real-time
- ✂️ Applies regex replacement rules to copied text
- ⚙️ Easy-to-use configuration interface
- 💾 Rules are saved and synced across devices
- 🎨 Modern, user-friendly interface
- 🔄 Default rule for Instagram links (www.instagram.com → d.ddinstagram.com)

## Installation

1. Clone or download this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (toggle in the top right)
4. Click "Load unpacked"
5. Select the directory containing the extension files

## Usage

1. Click the extension icon to open the configuration popup
2. Add your regex replacement rules:
   - **Pattern**: The text to search for (supports regex)
   - **Replacement**: The text to replace it with
3. Copy text containing your specified patterns
4. The extension will automatically apply the rules

### Example Rules

- Replace Instagram links:
  - Pattern: `www.instagram.com`
  - Replacement: `d.ddinstagram.com`
- Replace YouTube links:
  - Pattern: `youtube.com`
  - Replacement: `yewtu.be`

## Development

The extension consists of the following files:

- `manifest.json`: Extension configuration
- `background.js`: Handles rules storage and retrieval
- `content.js`: Monitors clipboard and applies rules
- `index.html`: Popup interface
- `style.css`: UI styles
- `scripts.js`: Popup functionality

## License

MIT License - See LICENSE file for details

## Contributing

Feel free to submit issues and enhancement requests!
