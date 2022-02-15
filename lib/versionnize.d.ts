export declare type VersionProps = string | ({
    add: number;
} & ({
    type: 'patch';
} | {
    type: 'minor';
} | {
    type: 'major';
}));
export declare function versionnize(props: VersionProps, version: string): string;
