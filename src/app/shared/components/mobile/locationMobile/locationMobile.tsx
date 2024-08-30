import Icon from '@shared/components/common/icons';
import colors from '@shared/theme/colors';
import Title from '@shared/wrappers/Title';
import { APIProvider, AdvancedMarker, Map } from '@vis.gl/react-google-maps';
import React from 'react';
import CollapsedText from '../collapsedText/collapsedText';
import './_locationMobile.scss';

export default function LocationMobile({
  pos,
  title,
  description,
  header,
}: {
  pos: { lat: number; lng: number };
  title: string | null;
  description: string | null;
  header: boolean;
}) {
  return (
    <div>
      {
        header && <Title level={4} color={colors.neutrals[500]}>Location</Title>
      }
      <div className="location">
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ''}>
          <Map mapId={process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ''} defaultCenter={pos}>
            <AdvancedMarker position={pos}>
              <Icon name="dropLoc" width={100} height={100} />
            </AdvancedMarker>
          </Map>
        </APIProvider>
      </div>
      {title && (
        <Title level={5} color={colors.neutrals[500]}>
          {title}
        </Title>
      )}
      {description && (
        <CollapsedText
          description={description}
          maxHeight={20}
          side="left"
        />
      )}
    </div>
  );
}
