export const colorScales = [
{
  name: 'Navy',
  usage: 'Brand. Page titles, headline numbers, the “Med” in the wordmark.',
  swatches: [
  { token: 'navy-50', hex: '#EEF2FA' },
  { token: 'navy-100', hex: '#D6DFF2' },
  { token: 'navy-300', hex: '#8FA3D1' },
  { token: 'navy-500', hex: '#1E3F8A' },
  { token: 'navy-700', hex: '#0B2A6B' },
  { token: 'navy-900', hex: '#061A45' }]

},
{
  name: 'Teal',
  usage: 'Primary action. Buttons, active navigation, links, focus rings.',
  swatches: [
  { token: 'teal-50', hex: '#EAF6F5' },
  { token: 'teal-100', hex: '#CDEBE8' },
  { token: 'teal-300', hex: '#6CC2BB' },
  { token: 'teal-500', hex: '#0E8A86' },
  { token: 'teal-600', hex: '#0B7672' },
  { token: 'teal-900', hex: '#053B39' }]

}];


export const neutralTokens = [
{ token: 'ink', hex: '#0F1B2D', usage: 'Primary text' },
{ token: 'ink-muted', hex: '#526071', usage: 'Secondary text' },
{ token: 'ink-subtle', hex: '#8491A1', usage: 'Placeholders, meta' },
{ token: 'line', hex: '#E4EAF0', usage: 'Borders, dividers' },
{ token: 'canvas', hex: '#F5F8FA', usage: 'App background' },
{ token: 'white', hex: '#FFFFFF', usage: 'Surfaces' }];


export const semanticTokens = [
{ name: 'Success', token: 'success', fill: '#EAF7EF', solid: '#1F8A4C', usage: 'Online, active, passed checks' },
{ name: 'Warning', token: 'warning', fill: '#FEF5E7', solid: '#B26A00', usage: 'Waiting, slow, needs review' },
{ name: 'Danger', token: 'danger', fill: '#FDECEC', solid: '#C0392B', usage: 'Offline, failed, destructive' },
{ name: 'Info', token: 'info', fill: '#EAF1FB', solid: '#2463B8', usage: 'Neutral guidance, setting up' }];


export const typeScale = [
{ name: 'Display', className: 'font-display text-5xl font-bold tracking-tight', spec: 'Plus Jakarta Sans · 48 / 700', sample: '2.4M studies' },
{ name: 'Page title', className: 'font-display text-[26px] font-bold tracking-tight', spec: 'Plus Jakarta Sans · 26 / 700', sample: 'Imaging servers' },
{ name: 'Section title', className: 'font-display text-[15px] font-semibold', spec: 'Plus Jakarta Sans · 15 / 600', sample: 'Waiting for review' },
{ name: 'Body', className: 'text-sm', spec: 'Inter · 14 / 400', sample: 'Studies move only with the patient’s consent.' },
{ name: 'Caption', className: 'text-xs text-ink-muted', spec: 'Inter · 12 / 400', sample: 'Synced 2 min ago' },
{ name: 'Code', className: 'font-mono text-[13px]', spec: 'JetBrains Mono · 13 / 400', sample: 'AIIMS_PACS01 · 10.12.4.21:104' }];


export const radii = [
{ token: 'rounded', px: '4px', usage: 'Modality chips' },
{ token: 'rounded-lg', px: '8px', usage: 'Buttons, inputs' },
{ token: 'rounded-xl', px: '12px', usage: 'Panels, menus' },
{ token: 'rounded-full', px: '999px', usage: 'Badges, avatars' }];


export const motionTokens = [
{ name: 'Press', duration: '150ms', easing: 'ease-out', usage: 'Button scale to 0.98' },
{ name: 'Menu', duration: '150ms', easing: 'cubic-bezier(0.23, 1, 0.32, 1)', usage: 'Dropdowns from 0.96' },
{ name: 'Segment', duration: '200ms', easing: 'cubic-bezier(0.23, 1, 0.32, 1)', usage: 'Active tab indicator' },
{ name: 'Drawer', duration: '280ms', easing: 'cubic-bezier(0.23, 1, 0.32, 1)', usage: 'Side panels slide in' }];


export const voiceRules = [
{ do: 'Studies move only with the patient’s consent.', dont: 'Leverage consent-driven interoperability.' },
{ do: 'Couldn’t reach AIIMS_PACS01. C-ECHO timed out after 10 s.', dont: 'Error 504: connection failure.' },
{ do: 'Onboard hospital', dont: 'Submit' }];