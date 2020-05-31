import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../../../services/api';
import Service from '~/pages/Service';

function ActuationAreaScreen({ navigation }) {
  const [submitting, setSubmitting] = useState(false);
  const token = useSelector(state => state.auth.token);
  const profileId = useSelector(state => state.user.profile.id);
  const [occupationCities, setOccupationCities] = useState([]);
  const [occupationAreas, setOccupationAreas] = useState([]);
  const occupationCitiesArray = Array.from(occupationCities);
  const occupationAreasArray = Array.from(occupationAreas);
  const onSubmit = useCallback(
    // eslint-disable-next-line no-unused-vars

    async ({ selectedCities, selectedAreaAtuacao }) => {
      // console.log(selectedCities);
      // console.log(selectedAreaAtuacao);

      // selectedCities.map(selectedCities => console.log(selectedCities.city));

      selectedCities.map(function(selectedCities) {
        // console.log(selectedCities.city);
        // console.log(selectedCities.uf.nome);

        occupationCitiesArray.push({
          city: selectedCities.city,
          state: selectedCities.state,
        });
        setOccupationCities(occupationCitiesArray);
      });
      // console.log('aaa', occupationCities);
      selectedAreaAtuacao.map(function(selectedAreaAtuacao) {
        // console.log(selectedCities.city);
        // console.log(selectedCities.uf.nome);

        occupationAreasArray.push({
          occupationAreaId: selectedAreaAtuacao.id,
        });
        setOccupationAreas(occupationAreasArray);

        //  console.log('bbb', occupationAreasArray);
      });
      // console.log(
      //   'oq envio',
      //   JSON.stringify({
      //     occupationAreas: occupationAreasArray,
      //     occupationCities: occupationCitiesArray,
      //   })
      // );
      try {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        const response = await api.post(
          `providers/${profileId}/occupation_areas`,
          {
            occupationAreas: occupationAreasArray,
            occupationCities: occupationCitiesArray,
          }
        );
        console.log(response);
        setSubmitting(true);
        navigation.navigate('PaymentMethodsScreen');
      } catch (ex) {
        return 0;
      } finally {
        setSubmitting(false);
      }
    },
    [navigation, occupationAreasArray, occupationCitiesArray, profileId, token]
  );

  return (
    <Service
      isNewProvider
      onSubmitNewProvider={onSubmit}
      submitting={submitting}
      token={token}
      profileid={profileId}
    />
  );
}

export default ActuationAreaScreen;
