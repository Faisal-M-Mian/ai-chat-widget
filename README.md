# AI Chat Widget System

An embeddable chat widget that connects to n8n webhooks with secure backend proxy.

## 🚀 Quick Start

### For Website Owners
Add this single line to your website:
```html
<script src="https://chatwidget.datagen.agency/widget.js"></script>
```

The widget appears as a blue floating chat icon in the bottom-left corner.

## 📁 Project Structure

- **Frontend**: React app with demo homepage
- **Backend**: Express.js server with secure API proxy
- **Widget**: Vanilla JavaScript embeddable widget
- **Security**: Domain validation for n8n webhooks

## 🛠️ Development

```bash
npm install
npm run dev
```

## 🚢 Deployment

See `DEPLOYMENT_GUIDE.md` for complete Coolify deployment instructions.

## 🔧 Features

- ✅ Floating chat widget with animations
- ✅ Secure n8n webhook integration
- ✅ Cross-origin embedding support
- ✅ Responsive design
- ✅ Session management
- ✅ Error handling

## 🔒 Security

- Domain validation (only datagen.agency webhooks allowed)
- Input validation with Zod schemas
- CORS protection
- HTTPS requirement for production

## 📄 License

MIT License