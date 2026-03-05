import { Image, View } from 'react-native'

import { PlatformText } from '@/features/platform/components/platform-text'
import { Icon } from '@/shared/components/icons/icon'
import { BaseColors } from '@/shared/constants/theme.constant'
import { cn } from '@/shared/libs/tw-merge'

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type AvatarProps = {
  photo?: string
  name?: string
  size?: AvatarSize
  backgroundColor?: string
  className?: string
}

const sizeClasses: Record<
  AvatarSize,
  { container: string; text: string; icon: number }
> = {
  xs: { container: 'w-6 h-6', text: 'text-[10px]', icon: 16 },
  sm: { container: 'w-6 h-6', text: 'text-[10px]', icon: 12 },
  md: { container: 'w-8 h-8', text: 'text-xs', icon: 16 },
  lg: { container: 'w-10 h-10', text: 'text-sm', icon: 20 },
  xl: { container: 'w-20 h-20', text: 'text-2xl', icon: 40 },
}

function generateInitial(name?: string): string {
  if (!name) return ''
  return name.trim().charAt(0).toUpperCase()
}

export function Avatar({
  photo,
  name,
  size = 'md',
  backgroundColor = 'bg-base-black',
  className,
}: AvatarProps) {
  const sizeClass = sizeClasses[size]
  const initial = generateInitial(name)

  return (
    <View
      className={cn(
        'items-center justify-center rounded-full overflow-hidden',
        sizeClass.container,
        backgroundColor,
        className,
      )}
    >
      {photo ? (
        <Image
          source={{ uri: photo }}
          className="w-full h-full"
          resizeMode="cover"
        />
      ) : initial ? (
        <PlatformText
          fontWeight={700}
          color="base-white"
          className={sizeClass.text}
        >
          {initial}
        </PlatformText>
      ) : (
        <Icon iconName="user" size={sizeClass.icon} color={BaseColors.white} />
      )}
    </View>
  )
}
