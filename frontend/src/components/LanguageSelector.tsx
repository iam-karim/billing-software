import { useLocale, SupportedLanguage, SupportedRegion } from '@/contexts/LocaleContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

export default function LanguageSelector() {
  const { region, language, setRegion, setLanguage } = useLocale();

  const regions: Array<{ code: SupportedRegion; name: string; flag: string }> = [
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
    { code: 'IN', name: 'India', flag: '🇮🇳' },
  ];

  const languages: Array<{ code: SupportedLanguage; name: string }> = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
    { code: 'hi', name: 'हिन्दी' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Region</DropdownMenuLabel>
        {regions.map((r) => (
          <DropdownMenuItem
            key={r.code}
            onClick={() => setRegion(r.code)}
            className={region === r.code ? 'bg-accent' : ''}
          >
            <span className="mr-2">{r.flag}</span>
            {r.name}
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel>Language</DropdownMenuLabel>
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={language === lang.code ? 'bg-accent' : ''}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
