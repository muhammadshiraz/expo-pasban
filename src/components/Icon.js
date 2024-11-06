import React from 'react';
import { View, StyleSheet } from 'react-native';

// Import SVGs as React components
import AuthorityLetter from '@assets/icons/authority_letter.svg';
import LTOApprovals from '@assets/icons/lto_approvals.svg';
import VehicleTracking from '@assets/icons/vehicle_tracking.svg';
import Quiz from '@assets/icons/quiz.svg';
import VehicleCar from '@assets/icons/vehicle-car-profile.svg';
import LTO_DDC from '@assets/icons/lto_ddc.svg';
import Create from '@assets/icons/create.svg';
import ViewEdit from '@assets/icons/view.svg';
import Driver from '@assets/icons/driver.svg';
import AuthLetter from '@assets/icons/auth_letter.svg';
import Moniter from '@assets/icons/moniter.svg';
import MasterData from '@assets/icons/master_data.svg';
import VehicleInspection from '@assets/icons/vehicle_inspection.svg';
import Manage from '@assets/icons/manage.svg';
import CancelledLTO from '@assets/icons/can_lto.svg';
import PenLTO from '@assets/icons/pen_lto.svg';
import ActiveQuizSession from '@assets/icons/active_quiz_session.svg';
import PastQuizSession from '@assets/icons/tabler_license.svg';
import CreateNewReq from '@assets/icons/create-new-req.svg';
import ViewAllRequest from '@assets/icons/view_all_request.svg';

const Icon = ({ name, size = 24, color, style }) => {
  let IconComponent;

  switch (name) {
    case 'authority_letter':
      IconComponent = AuthorityLetter;
      break;
    case 'lto_approvals':
      IconComponent = LTOApprovals;
      break;
    case 'vehicle_tracking':
      IconComponent = VehicleTracking;
      break;
    case 'quiz':
      IconComponent = Quiz;
      break;
    case 'vehicle_car':
      IconComponent = VehicleCar;
      break;
    case 'lto_ddc':
      IconComponent = LTO_DDC;
      break;
    case 'create':
      IconComponent = Create;
      break;
    case 'view':
      IconComponent = ViewEdit;
      break;
    case 'driver':
      IconComponent = Driver;
      break;
    case 'auth_letter':
      IconComponent = AuthLetter;
      break;
    case 'moniter':
      IconComponent = Moniter;
      break;
    case 'master_data':
      IconComponent = MasterData;
      break;
    case 'vehicle_inspection':
      IconComponent = VehicleInspection;
      break;
    case 'manage':
      IconComponent = Manage;
      break;
    case 'can_lto':
      IconComponent = CancelledLTO;
      break;
    case 'pen_lto':
      IconComponent = PenLTO;
      break;
    case 'active_quiz':
      IconComponent = ActiveQuizSession;
      break;
    case 'past_quiz':
      IconComponent = PastQuizSession;
      break;
    case 'create_new_request':
      IconComponent = CreateNewReq;
      break;
    case 'view_all_request':
      IconComponent = ViewAllRequest;
      break;
    // Add more cases for other icons
    default:
      return null;
  }

  return (
    <View style={[styles.container, style]}>
      <IconComponent
        width={size}
        height={size}
        fill={color || '#fff'} // Use currentColor if no color is provided
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Icon;
