import React from 'react'
import { Image } from 'react-native'

interface FlagInterfaceProps {
  countryCode: string

}
const CountryFlag = ({ countryCode }: FlagInterfaceProps) => {
  const flagSource = `https://www.countryflags.io/${countryCode}/flat/32.png`;
  return (
    <Image
      style={{ height: 50, width: 50, marginHorizontal: '1%' }}
      source={{ uri: flagSource }}
    />
  );
}

export default CountryFlag

