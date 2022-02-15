function splitVersion(version: string) {
  const _versionsA = version.split('.').map(v => Number.parseInt(v));
  return {
    patch: _versionsA[2],
    minor: _versionsA[1],
    major: _versionsA[0],
  };
}

function buildVersion({
  patch,
  minor,
  major,
}: {
  patch: number;
  minor: number;
  major: number;
}) {
  return `${major}.${minor}.${patch}`;
}

export type VersionProps =
  | string
  | ({ add: number } & (
      | { type: 'patch' }
      | { type: 'minor' }
      | { type: 'major' }
    ));

export function versionnize(props: VersionProps, version: string) {
  let _version = version;
  if (typeof props === 'string') {
    _version = props;
  } else {
    const versions = splitVersion(_version);
    const { add, type } = props;
    versions[type] += add;
    _version = buildVersion(versions);
  }
  return _version;
}
