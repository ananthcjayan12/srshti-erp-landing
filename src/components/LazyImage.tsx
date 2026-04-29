import React from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    /** Explicit width to prevent CLS */
    width?: number | string;
    /** Explicit height to prevent CLS */
    height?: number | string;
    /** Set to "high" for above-the-fold images */
    fetchPriority?: 'high' | 'low' | 'auto';
}

/**
 * Performance-optimized image component.
 * - Uses native lazy loading by default (override with loading="eager" for hero images)
 * - Uses async decoding to avoid blocking the main thread
 * - Requires explicit dimensions to prevent Cumulative Layout Shift (CLS)
 */
const LazyImage: React.FC<LazyImageProps> = ({
    loading = 'lazy',
    decoding = 'async',
    fetchPriority = 'auto',
    ...props
}) => {
    return (
        <img
            loading={loading}
            decoding={decoding as any}
            fetchPriority={fetchPriority as any}
            {...props}
        />
    );
};

export default LazyImage;
