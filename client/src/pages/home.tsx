import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, MessageCircle, Shield, Zap, Globe } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [copied, setCopied] = useState(false);
  
  const installCode = `<script src="https://chatwidget.datagen.agency/widget.js"></script>`;
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(installCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">AI Chat Widget</h1>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Live
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Embeddable AI Assistant Widget
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Add an intelligent chat widget to any website with a single line of code. 
              Powered by n8n webhooks with enterprise-grade security.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Easy Integration</CardTitle>
                <CardDescription>
                  Single script tag installation. No complex setup required.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-green-600 mb-2" />
                <CardTitle>Secure by Design</CardTitle>
                <CardDescription>
                  Domain validation ensures only authorized webhook endpoints are used.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Globe className="h-10 w-10 text-purple-600 mb-2" />
                <CardTitle>Universal Compatibility</CardTitle>
                <CardDescription>
                  Works on any website with full CORS support and responsive design.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Installation Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span>Quick Installation</span>
              </CardTitle>
              <CardDescription>
                Add this single line of code to your website's HTML to enable the chat widget.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 rounded-lg p-4 relative">
                <code className="text-green-400 font-mono text-sm block pr-10">
                  {installCode}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2 bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                  onClick={copyToClipboard}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                The widget will automatically appear in the lower left corner of your website 
                with a floating chat icon that connects to your n8n workflow.
              </p>
            </CardContent>
          </Card>

          {/* Demo Section */}
          <Card>
            <CardHeader>
              <CardTitle>Live Demo</CardTitle>
              <CardDescription>
                The chat widget is active on this page. Look for the floating blue icon 
                in the lower left corner to try it out!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Try the Widget</h4>
                    <p className="text-blue-700 text-sm">
                      Click the floating chat icon to open the AI Assistant and send a test message. 
                      Your message will be processed through the secure n8n webhook integration.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>AI Chat Widget System • Secure n8n Integration • Enterprise Ready</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
