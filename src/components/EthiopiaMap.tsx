// EthiopiaMap.tsx
import React from 'react';

const EthiopiaMap: React.FC = () => {
    return (
        <div style={{ width: '100%', height: '600px' }}>
            <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=39.99999999999999%2C7.999999999999999%2C41.99999999999999%2C10.999999999999998&layer=mapnik&marker=9.145%2C40.489673"
                style={{ width: '100%', height: '100%', border: 'none' }}
                title="Ethiopia Map"
            />
            <br />
            <small>
                <a href="https://www.openstreetmap.org/#map=6/9.145/40.4897">View Larger Map</a>
            </small>
        </div>
    );
};

export default EthiopiaMap;
