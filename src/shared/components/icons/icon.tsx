import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Bell,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ClipboardList,
  Clock,
  Grid2X2,
  Heart,
  Lock,
  LogOut,
  Mail,
  Menu,
  Phone,
  Pill,
  ShoppingBag,
  Star,
  User,
  Users,
} from 'lucide-react-native'

import { WhatsAppIcon } from './whatsapp-icon'

export type IconName =
  | 'arrow-down'
  | 'arrow-left'
  | 'arrow-up'
  | 'bell'
  | 'calendar'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-up'
  | 'clipboard'
  | 'clock'
  | 'envelope'
  | 'heart'
  | 'lock'
  | 'logout'
  | 'menu'
  | 'phone'
  | 'pill'
  | 'shopping-bag'
  | 'star'
  | 'th-large'
  | 'user'
  | 'users'
  | 'whatsapp'

type IconProps = {
  iconName: IconName
  size?: number
  color?: string
}

export function Icon({ iconName, size = 24, color = '#1C1C1C' }: IconProps) {
  const props = { size, color }

  switch (iconName) {
    case 'arrow-down':
      return <ArrowDown {...props} />
    case 'arrow-left':
      return <ArrowLeft {...props} />
    case 'arrow-up':
      return <ArrowUp {...props} />
    case 'bell':
      return <Bell {...props} />
    case 'calendar':
      return <Calendar {...props} />
    case 'chevron-down':
      return <ChevronDown {...props} />
    case 'chevron-left':
      return <ChevronLeft {...props} />
    case 'chevron-right':
      return <ChevronRight {...props} />
    case 'chevron-up':
      return <ChevronUp {...props} />
    case 'clipboard':
      return <ClipboardList {...props} />
    case 'clock':
      return <Clock {...props} />
    case 'envelope':
      return <Mail {...props} />
    case 'heart':
      return <Heart {...props} />
    case 'lock':
      return <Lock {...props} />
    case 'logout':
      return <LogOut {...props} />
    case 'menu':
      return <Menu {...props} />
    case 'phone':
      return <Phone {...props} />
    case 'pill':
      return <Pill {...props} />
    case 'shopping-bag':
      return <ShoppingBag {...props} />
    case 'star':
      return <Star {...props} />
    case 'th-large':
      return <Grid2X2 {...props} />
    case 'user':
      return <User {...props} />
    case 'users':
      return <Users {...props} />
    case 'whatsapp':
      return <WhatsAppIcon size={size} color={color} />
    default:
      return null
  }
}
