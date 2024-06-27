import { SafeAreaViewUI } from '@/components';
import NavigationGoBack from '@/components/navigation/NavigationGoBack';
import React from 'react';

const CreateSolutionScreen = () => {
  return (
    <SafeAreaViewUI className="px-6 !w-full">
      <NavigationGoBack title="Thay " titleAlight />
    </SafeAreaViewUI>
  );
};

export default CreateSolutionScreen;
