export enum OsName {
  windows = 'windows',
  mac = 'mac',
  linux = 'linux',
  unknown = 'unknown',
}

export class Download {
  public stableTag = 'v1.0.4';
  public stableVersion = '1.0.4';

  public experimentalTag = 'v1.0.0-rc1';
  public experimentalVersion = '1.0.0-rc1';

  public get currentOsName(): OsName {
    const platform = navigator.platform.toLowerCase();
    const userAgent = navigator.userAgent.toLowerCase();

    if (platform.includes('mac')) return OsName.mac;
    if (platform.includes('win')) return OsName.windows;
    if (platform.includes('linux')) return OsName.linux;

    // Fallback (covers some edge cases)
    if (userAgent.includes('mac')) return OsName.mac;
    if (userAgent.includes('win')) return OsName.windows;
    if (userAgent.includes('linux')) return OsName.linux;

    return OsName.unknown;
  }

  public get currentUrl() {
    return this.urlFor(this.currentOsName, false);
  }

  public urlFor(osName: OsName, isExperimental: boolean) {
    const suffix = this.fileNameSuffix(osName);
    const tag = isExperimental ? this.experimentalTag : this.stableTag;
    const version = isExperimental ? this.experimentalVersion : this.stableVersion;
    return `https://github.com/argonprotocol/apps/releases/download/${tag}/Argon.Investor.Console_${version}_${suffix}`;
  }

  private fileNameSuffix(osName: OsName, isDebug: boolean = false) {
    if (osName === 'mac') {
      return `universal${isDebug ? '-debug' : ''}.dmg`;
    } else if (osName === 'windows') {
      return `x64-setup${isDebug ? '-debug' : ''}.exe`;
    } else if (osName === 'linux') {
      return `amd64${isDebug ? '-debug' : ''}.deb`;
    }
  }
}