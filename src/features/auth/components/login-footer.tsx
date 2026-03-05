import { View } from 'react-native'

import { PlatformText } from '@/features/platform/components/platform-text'
import { Button } from '@/shared/components/button'

export function LoginFooter() {
  return (
    <View className="items-center mt-[4.3125rem]">
      <PlatformText fontSize={17} color="base-white" className="mb-2">
        New to Adere?
      </PlatformText>
      <Button variant="unstyled" disabled activeOpacity={1}>
        <PlatformText fontSize={15} color="base-white" className="underline">
          Create an account
        </PlatformText>
      </Button>
    </View>
  )
}
