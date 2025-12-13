const currentTag = 'untagged-c61adb52c17cff08cc8f';
const currentVersion = '1.0.0';

export enum OsName {
  windows = 'windows',
  mac = 'mac',
  linux = 'linux',
  unknown = 'unknown',
}

export class Download {
  public currentTag = currentTag;
  public currentVersion = currentVersion;

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

  public urlFor(osName: OsName, isExperimental: boolean) {
    const suffix = this.fileNameSuffix(osName, isExperimental);
    return `https://github.com/argonprotocol/apps/releases/download/${this.currentTag}/Argon.Investor.Console_${this.currentVersion}_${suffix}`;
  }

  private fileNameSuffix(osName: OsName, isExperimental: boolean) {
    if (osName === 'mac') {
      return `universal${isExperimental ? '-debug' : ''}.dmg`;
    } else if (osName === 'windows') {
      return `x64-setup${isExperimental ? '-debug' : ''}.exe`;
    } else if (osName === 'linux') {
      return `amd64${isExperimental ? '-debug' : ''}.deb`;
    }
  }
}