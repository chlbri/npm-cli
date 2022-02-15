export * from './clean';
export * from './pack';
export * from './rinit';
export * from './isUpToDate';
declare type Props = {
    currentBranch?: string;
    productionBranch?: string;
    lib?: string;
};
export default function publish({ currentBranch, productionBranch, lib, }: Props): void;
