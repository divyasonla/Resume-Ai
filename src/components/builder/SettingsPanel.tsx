
import { useResume } from '@/contexts/ResumeContext';
import { THEME_COLORS } from '@/types/resume';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Palette, Type } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';

export default function SettingsPanel() {
  const { resumeData, updateSettings } = useResume();
  const { settings } = resumeData;

  // Font options (static for demo, can be dynamic)
  const fontFamilies = [
    'Arial', 'Cambria', 'Garamond', 'IBM Plex Sans', 'IBM Plex Serif', 'Lato',
    'Lora', 'Merriweather', 'Open Sans', 'Playfair Display', 'PT Sans', 'PT Serif',
    'Roboto Condensed', 'Times New Roman'
  ];
  const fontSubsets = ['latin', 'latin-ext', 'cyrillic', 'greek'];
  const fontVariants = [
    'regular', 'italic', '600', 'bold', '700', 'light', '300'
  ];

  return (
    <div className="p-4 space-y-8">
      {/* Typography Section */}
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-4"><Type className="h-6 w-6" />Typography</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
          {fontFamilies.map(f => (
            <button
              key={f}
              onClick={() => updateSettings({ fontFamily: f })}
              className={cn(
                'border rounded px-3 py-2 text-left font-medium transition-all',
                settings.fontFamily === f ? 'border-foreground bg-muted/20' : 'border-muted'
              )}
              style={{ fontFamily: f }}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Label className="mb-1 block">Font Family</Label>
            <select
              className="w-full border rounded px-2 py-1"
              value={settings.fontFamily}
              onChange={e => updateSettings({ fontFamily: e.target.value })}
            >
              {fontFamilies.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div>
            <Label className="mb-1 block">Font Subset</Label>
            <select
              className="w-full border rounded px-2 py-1"
              value={settings.fontSubset}
              onChange={e => updateSettings({ fontSubset: e.target.value })}
            >
              {fontSubsets.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <Label className="mb-1 block">Font Variants</Label>
            <select
              className="w-full border rounded px-2 py-1"
              value={settings.fontVariants}
              onChange={e => updateSettings({ fontVariants: e.target.value })}
            >
              {fontVariants.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
        </div>
        <div className="flex items-center gap-8 mb-4">
          <div className="flex-1">
            <Label className="flex items-center gap-2 mb-1">Font Size</Label>
            <Slider
              value={[settings.fontSize]}
              onValueChange={([value]) => updateSettings({ fontSize: value })}
              min={9}
              max={18}
              step={0.5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>9</span>
              <span>{settings.fontSize}</span>
              <span>18</span>
            </div>
          </div>
          <div className="flex-1">
            <Label className="flex items-center gap-2 mb-1">Line Height</Label>
            <Slider
              value={[settings.lineHeight]}
              onValueChange={([value]) => updateSettings({ lineHeight: value })}
              min={1}
              max={2}
              step={0.05}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>1</span>
              <span>{settings.lineHeight}</span>
              <span>2</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <Label className="flex items-center gap-2">Options</Label>
          <div className="flex items-center gap-2">
            <Switch
              checked={settings.hideIcons}
              onCheckedChange={checked => updateSettings({ hideIcons: checked })}
            />
            <span>Hide Icons</span>
          </div>
        </div>
      </div>

      {/* Theme Color Section */}
      <div>
        <Label className="flex items-center gap-2 mb-3">
          <Palette className="h-4 w-4" />
          Theme Color
        </Label>
        <div className="grid grid-cols-6 gap-2">
          {THEME_COLORS.map((color) => (
            <button
              key={color.name}
              onClick={() => updateSettings({ themeColor: color.value })}
              className={cn(
                'w-8 h-8 rounded-full border-2 transition-all hover:scale-110',
                settings.themeColor === color.value
                  ? 'border-foreground ring-2 ring-offset-2 ring-offset-background'
                  : 'border-transparent'
              )}
              style={{ backgroundColor: `hsl(${color.value})` }}
              title={color.name}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          This color applies to all headings and accents in your resume
        </p>
      </div>
    </div>
  );
}
