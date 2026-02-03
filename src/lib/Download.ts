export enum OsName {
  windows = 'windows',
  mac = 'mac',
  linux = 'linux',
  unknown = 'unknown',
}

export class Download {
  public stableVersion!: string;
  public experimentalVersion = '1.0.0-rc1';

  public isLoaded = false;

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

  public async load() {
    const response = await fetch('https://raw.githubusercontent.com/argonprotocol/apps/refs/heads/main/release-channels/operations-stable.json');
    const data = await response.json();
    this.stableVersion = data.version;
    this.isLoaded = true;
  }

  public get currentUrl() {
    return this.urlFor(this.currentOsName, false);
  }

  public urlFor(osName: OsName, isExperimental: boolean) {
    if (!this.isLoaded) throw new Error('download.load() must be called first');
    const suffix = this.fileNameSuffix(osName);
    const version = isExperimental ? this.experimentalVersion : this.stableVersion;
    return `https://github.com/argonprotocol/apps/releases/download/v${version}/Argon.Operations_${version}_${suffix}`;
  }

  private fileNameSuffix(osName: OsName, isDebug: boolean = true) {
    if (osName === 'mac') {
      return `universal${isDebug ? '-debug' : ''}.dmg`;
    } else if (osName === 'windows') {
      return `x64-setup${isDebug ? '-debug' : ''}.exe`;
    } else if (osName === 'linux') {
      return `amd64${isDebug ? '-debug' : ''}.deb`;
    }
  }
}