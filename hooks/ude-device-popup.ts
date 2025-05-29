"use client"

import { useState } from "react"
import { deviceConfigurations, type DeviceConfig } from "@/lib/device-data"

export function useDevicePopup() {
  const [selectedDevice, setSelectedDevice] = useState<DeviceConfig | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const openDevicePopup = (deviceId: string) => {
    const device = deviceConfigurations[deviceId as keyof typeof deviceConfigurations]
    if (device) {
      setSelectedDevice(device)
      setIsOpen(true)
    }
  }

  const closeDevicePopup = () => {
    setIsOpen(false)
    setSelectedDevice(null)
  }

  return {
    selectedDevice,
    isOpen,
    openDevicePopup,
    closeDevicePopup,
  }
}
