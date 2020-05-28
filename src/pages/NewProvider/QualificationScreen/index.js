import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import Qualification from '~/pages/Qualification';
import api from '../../../services/api';

function QualificationScreen({ navigation }) {
  const token = useSelector(state => state.auth.token);
  const profileId = useSelector(state => state.user.profile.id);

  const onSubmit = useCallback(
    // eslint-disable-next-line no-unused-vars

    async Arrayqualifications => {
      // console.log(selectedCities);
      // console.log(selectedAreaAtuacao);

      // selectedCities.map(selectedCities => console.log(selectedCities.city));

      // qualifications.map(function(qualifications) {
      //   // console.log(selectedCities.city);
      //   // console.log(selectedCities.uf.nome);

      //   qualifications.push({
      //     city: selectedCities.city,
      //     state: selectedCities.uf.nome,
      //   });
      //   setOccupationCities(occupationCitiesArray);
      // });
      // console.log('aaa', occupationCities);
      // console.log(
      //   'oq envio',
      //   JSON.stringify({
      //     occupationAreas: occupationAreasArray,
      //     occupationCities: occupationCitiesArray,
      //   })
      // );

      console.log(
        'oq envio',
        JSON.stringify({
          qualifications: Arrayqualifications,
        })
      );
      try {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        const response = await api.post(
          `providers/${profileId}/qualifications`,
          {
            qualifications: Arrayqualifications,
          }
        );
        console.log(response);
        navigation.navigate('Painel');
      } catch (ex) {
        console.warn(ex);
      } finally {
        setSubmitting(false);
      }
    },

    [navigation, profileId, token]
  );
  return <Qualification isNewProvider onSubmitNewProvider={onSubmit} />;
}

export default QualificationScreen;
