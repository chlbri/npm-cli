export * from './clean';
export * from './isUpToDate';
export * from './pack';
export * from './rinit';
export * from './versionnize';
import { VersionProps } from './versionnize';
declare type Props = {
    currentBranch?: string;
    productionBranch?: string;
    lib?: string;
    versionProps?: VersionProps;
};
export default function publish({ currentBranch, productionBranch, lib, versionProps, }: Props): Promise<void>;
