import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-midnight_navy mb-8">Account Settings</h1>

      <div className="space-y-10">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-midnight_navy">Profile Information</CardTitle>
            <CardDescription className="text-slate_gray">Manage your organization's details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="orgName" className="font-medium text-midnight_navy">
                Organization Name
              </Label>
              <Input id="orgName" defaultValue="My Web3 Corp" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="contactEmail" className="font-medium text-midnight_navy">
                Contact Email
              </Label>
              <Input id="contactEmail" type="email" defaultValue="admin@myweb3corp.xyz" className="mt-1" />
            </div>
            <Button className="bg-electric_indigo hover:bg-electric_indigo/90 text-ghost_white">Save Profile</Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-midnight_navy">API & Webhooks</CardTitle>
            <CardDescription className="text-slate_gray">
              Configure API keys and webhook endpoints for integrations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="font-medium text-midnight_navy">API Key</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input readOnly value="dp_live_********************abcd" />
                <Button variant="outline">Reveal</Button>
                <Button variant="outline">Regenerate</Button>
              </div>
            </div>
            <Separator />
            <div>
              <Label htmlFor="webhookUrl" className="font-medium text-midnight_navy">
                Webhook Endpoint URL
              </Label>
              <Input id="webhookUrl" placeholder="https://api.myapp.com/webhook/drippay" className="mt-1" />
              <p className="text-xs text-slate_gray/70 mt-1">Receive real-time notifications for payment events.</p>
            </div>
            <Button className="bg-electric_indigo hover:bg-electric_indigo/90 text-ghost_white">
              Save Webhook Settings
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-midnight_navy">Notifications</CardTitle>
            <CardDescription className="text-slate_gray">Manage your email notification preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="newSubNotification" className="font-medium text-midnight_navy">
                  New Subscriptions
                </Label>
                <p className="text-xs text-slate_gray/70">Get notified when a new user subscribes.</p>
              </div>
              <Switch id="newSubNotification" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="failedPaymentNotification" className="font-medium text-midnight_navy">
                  Failed Payments
                </Label>
                <p className="text-xs text-slate_gray/70">Receive alerts for failed payment attempts.</p>
              </div>
              <Switch id="failedPaymentNotification" defaultChecked />
            </div>
            <Button className="bg-electric_indigo hover:bg-electric_indigo/90 text-ghost_white">
              Save Notification Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
