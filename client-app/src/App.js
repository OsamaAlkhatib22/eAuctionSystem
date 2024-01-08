// Routes
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SplitLayout from './Components/SplitLayout';
import ClientRegistrationPage from './Views/Authentication/Register/ClientRegistrationPage';
import FreelancerRegistrationPage from './Views/Authentication/Register/FreelancerRegistrationPage';
import LoginPage from './Views/Authentication/Login/LoginPage';
import ClientHome from './Views/ClientView/Home/ClientHome';
import FreeLancerHome from './Views/FreeLancerView/Home/FreeLancerHome';
import ClientProfile from './Views/ClientView/Profile/ClientProfile';
import ClientExploreTasks from './Views/ClientView/Tasks/ClientExploreTasks';
import ClientTransactions from './Views/ClientView/Transactions/ClientTransactions';
import FreeLancerProfile from './Views/FreeLancerView/Profile/FreeLancerProfile';
import FreeLancerTask from './Views/FreeLancerView/Tasks/FreeLancerTask';
import FreeLancerTransactions from './Views/FreeLancerView/Transactions/FreeLancerTransactions';
import FreeLancerHomeHeader from './Views/FreeLancerView/Home/FreeLancerHomeHeader';
import ProfileHeader from './Views/FreeLancerView/Profile/ProfileHeader';
import ClientProfileHeader from './Views/ClientView/Profile/ClientProfileHeader';
import TaskDetails from './Views/FreeLancerView/Home/TaskDetails';
import ClientTaskDetails from './Views/ClientView/Tasks/ClientTaskDetails';
import MyTasks from './Views/ClientView/Tasks/MyTasks';
import ClientCreateTask from './Views/ClientView/Tasks/ClientCreateTask';
import MyTaskDetails from './Views/ClientView/Tasks/MyTaskDetails';
import FreeLancerMyTask from './Views/FreeLancerView/Tasks/FreeLancerMyTask';
import MyTaskProcessDetails from './Views/ClientView/Tasks/MyTaskProcessDetails'
import MyTaskCompletedDetails from './Views/ClientView/Tasks/MyTaskCompletedDetails'
import ClientTransactionDetails from './Views/ClientView/Transactions/ClientTransactionDetails';
import FreeLancerMyTaskProceesDetails from './Views/FreeLancerView/Tasks/FreeLancerMyTaskProceesDetails';
import FreeLancerMyTaskCompletedDetails from './Views/FreeLancerView/Tasks/FreeLancerMyTaskCompletedDetails';
import FreeLancerMyTaskDetails from './Views/FreeLancerView/Tasks/FreeLancerMyTaskDetails';
import SelectedProfileUserNameInfo from './Components/SelectedProfileUserNameInfo';

//app  AuthProvider 
import { AuthProvider } from './Components/Context';



function App() {
  return (
    
    <Router>
      <AuthProvider>
      <div>
        <Routes>
          <Route path="/client-registration" element={<ClientRegistrationPage />} />
          <Route path="/freelancer-registration" element={<FreelancerRegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/FreeLancerHome" element={<FreeLancerHome />} />
          <Route path="/ClientHome" element={<ClientHome />} />
          <Route path="/ClientProfile" element = {<ClientProfile />} />
          <Route path="/ClientExploreTasks" element = {<ClientExploreTasks />} />
          <Route path="/ClientTransactions" element = {<ClientTransactions />} />
          <Route path="/FreeLancerTransactions" element = {<FreeLancerTransactions />} />
          <Route path="/FreeLancerTask" element = {<FreeLancerTask />} />
          <Route path="/FreeLancerProfile" element = {<FreeLancerProfile />} />
          <Route path="/FreeLancerHomeHeader" element = {<FreeLancerHomeHeader />} />
          <Route path="/ProfileHeader" element = {<ProfileHeader />} />
          <Route path="/ClientProfileHeader" element = {<ClientProfileHeader />} />
          <Route path="/task/:ServiceId" element={<TaskDetails />} />
          <Route path="/ctask/:ServiceId" element={<ClientTaskDetails />} />
          <Route path="/MyTasks" element = {<MyTasks />} />
          <Route path="/ClientCreateTask" element = {<ClientCreateTask />} />
          <Route path="/mtask/:ServiceId" element={<MyTaskDetails />} />
          <Route path="/SplitLayout" element={<SplitLayout />} />
          <Route path="/FreeLancerMyTask" element={<FreeLancerMyTask />} />
          <Route path="/ClientProcesstask/:ServiceId" element={<MyTaskProcessDetails />} />
          <Route path="/ClientCompletedtask/:ServiceId" element={<MyTaskCompletedDetails />} />
          <Route path="/TransferTransaction/:TransactionId" element={<ClientTransactionDetails />} />
          <Route path="/FreeLancerTaskInProcessDetails/:ServiceId" element={<FreeLancerMyTaskProceesDetails/>}/>
          <Route path="/FreeLancerTaskCompletedDetails/:ServiceId" element={<FreeLancerMyTaskCompletedDetails/>}/>
          <Route path="/FreeLancerMyTaskDetails/:ServiceId" element={<FreeLancerMyTaskDetails/>}/>
          <Route path="/SelectedProfileUserNameInfo/:UserName" element={<SelectedProfileUserNameInfo/>}/>

          <Route path="/" element={<SplitLayout />} />
        </Routes>
      </div>
    </AuthProvider>
    </Router>
  );
}

export default App;
