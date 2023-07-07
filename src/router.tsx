import React from 'react'
import {
    createHashRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom'
import Sections from './components/sections'
import MainPage from './pages/MainPage'
import PrivateRoute from './utils/PrivateRoute'
import { singleLoader, SinglePage } from './pages/SinglePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Layout from './components/Layout'
import Table, { tableLoader } from './components/Table'
import {
    EditPage,
    editLoader,
    createLoader,
    editCreateNestedLoader,
} from './pages/EditPage'
import Spinner from './components/Spinner'
import TableUser from './components/TableUser'
import TableSubscriptionService from './components/TableSubscriptionService'
import serviceRateEditLoader from './helpers/serviceRateEditLoader'
import serviceRateCreateLoader from './helpers/serviceRateCreateLoader'
import NotFoundPage from './pages/NotFoundPage'
import ErrorBoundary from './components/ErrorBoundary'

const router = createHashRouter(
    createRoutesFromElements(
        <Route>
            <Route element={<PrivateRoute />}>
                <Route path='/' element={<Layout />}>
                    <Route
                        index
                        element={<MainPage />}
                        errorElement={<ErrorBoundary />}
                    />

                    <Route path='/org'>
                        <Route
                            index
                            element={<Table />}
                            loader={tableLoader}
                            errorElement={<ErrorBoundary />}
                        />
                        <Route
                            path=':id'
                            element={<SinglePage />}
                            loader={singleLoader}
                            errorElement={<ErrorBoundary />}
                        />
                        <Route path=':id/edit'>
                            <Route
                                index
                                element={<Sections.Organization />}
                                loader={editLoader}
                                errorElement={<ErrorBoundary />}
                            />
                            <Route
                                path='org/create'
                                element={<Sections.OrgNestedOrg />}
                                loader={editCreateNestedLoader}
                                errorElement={<ErrorBoundary />}
                            />
                            <Route
                                path='device/create'
                                element={<Sections.DeviceNestedOrg />}
                                loader={editCreateNestedLoader}
                                errorElement={<ErrorBoundary />}
                            />
                            <Route
                                path='subscription/create'
                                element={<Sections.SubscriptionNestedOrg />}
                                loader={editCreateNestedLoader}
                                errorElement={<ErrorBoundary />}
                            />
                        </Route>
                        <Route
                            path='create'
                            element={<Sections.Organization />}
                            loader={createLoader}
                            errorElement={<ErrorBoundary />}
                        />
                    </Route>

                    <Route path='/device'>
                        <Route
                            index
                            element={<Table />}
                            loader={tableLoader}
                            errorElement={<ErrorBoundary />}
                        />
                        <Route
                            path=':id'
                            element={<SinglePage />}
                            loader={singleLoader}
                            errorElement={<ErrorBoundary />}
                        />
                        <Route
                            path=':id/edit'
                            element={<Sections.Device />}
                            loader={editLoader}
                            errorElement={<ErrorBoundary />}
                        />
                        <Route
                            path='create'
                            element={<Sections.Device />}
                            loader={createLoader}
                            errorElement={<ErrorBoundary />}
                        />
                    </Route>

                    <Route path='/device-type'>
                        <Route
                            index
                            element={<Table />}
                            loader={tableLoader}
                            errorElement={<ErrorBoundary />}
                        />
                        <Route
                            path=':id'
                            element={<SinglePage />}
                            loader={singleLoader}
                            errorElement={<ErrorBoundary />}
                        />
                        <Route
                            path=':id/edit'
                            element={<EditPage />}
                            loader={editLoader}
                            errorElement={<ErrorBoundary />}
                        />
                        <Route
                            path='create'
                            element={<Sections.DeviceType />}
                            errorElement={<ErrorBoundary />}
                        />
                    </Route>

                    {/* <Route path='/region'>
                        <Route index element={<Table />} loader={tableLoader} />
                        <Route
                            path=':id'
                            element={<SinglePage />}
                            loader={singleLoader}
                        />
                        <Route
                            path=':id/edit'
                            element={<Sections.Region />}
                            loader={editLoader}
                        />
                        <Route
                            path='create'
                            element={<Sections.Region />}
                            loader={createLoader}
                        />
                    </Route>

                    <Route path='/region-type'>
                        <Route index element={<Table />} loader={tableLoader} />
                        <Route
                            path=':id'
                            element={<SinglePage />}
                            loader={singleLoader}
                        />
                        <Route
                            path=':id/edit'
                            element={<EditPage />}
                            loader={editLoader}
                        />
                        <Route
                            path='create'
                            element={<Sections.RegionType />}
                        />
                    </Route> */}

                    <Route path='/inventory-type'>
                        <Route
                            index
                            element={<Table />}
                            loader={tableLoader}
                            errorElement={<ErrorBoundary />}
                        />
                        <Route
                            path=':id'
                            element={<SinglePage />}
                            loader={singleLoader}
                            errorElement={<ErrorBoundary />}
                        />
                        <Route
                            path=':id/edit'
                            element={<EditPage />}
                            loader={editLoader}
                            errorElement={<ErrorBoundary />}
                        />
                        <Route
                            path='create'
                            element={<Sections.InventoryType />}
                            errorElement={<ErrorBoundary />}
                        />
                    </Route>

                    <Route path='/working-area-type'>
                        <Route
                            index
                            element={<Table />}
                            loader={tableLoader}
                            errorElement={<ErrorBoundary />}
                        />
                        <Route
                            path=':id'
                            element={<SinglePage />}
                            loader={singleLoader}
                            errorElement={<ErrorBoundary />}
                        />
                        <Route
                            path=':id/edit'
                            element={<Sections.WorkingAreaType />}
                            loader={editLoader}
                            errorElement={<ErrorBoundary />}
                        />
                        <Route
                            path='create'
                            element={<Sections.WorkingAreaType />}
                            loader={createLoader}
                            errorElement={<ErrorBoundary />}
                        />
                    </Route>

                    <Route path='/permission'>
                        <Route
                            index
                            element={<Table />}
                            loader={tableLoader}
                            errorElement={<ErrorBoundary />}
                        />
                        <Route
                            path=':id'
                            element={<SinglePage />}
                            loader={singleLoader}
                            errorElement={<ErrorBoundary />}
                        />
                        <Route
                            path=':id/edit'
                            element={<Sections.Permission />}
                            loader={editLoader}
                            errorElement={<ErrorBoundary />}
                        />
                        <Route
                            path='create'
                            element={<Sections.Permission />}
                            loader={createLoader}
                            errorElement={<ErrorBoundary />}
                        />
                    </Route>

                    <Route path='/permission-group'>
                        <Route
                            index
                            element={<Table />}
                            loader={tableLoader}
                            errorElement={<ErrorBoundary />}
                        />
                        <Route
                            path=':id'
                            element={<SinglePage />}
                            loader={singleLoader}
                            errorElement={<ErrorBoundary />}
                        />
                        <Route
                            path=':id/edit'
                            element={<Sections.PermissionGroup />}
                            loader={editLoader}
                            errorElement={<ErrorBoundary />}
                        />
                        <Route
                            path='create'
                            element={<Sections.PermissionGroup />}
                            loader={createLoader}
                            errorElement={<ErrorBoundary />}
                        />
                    </Route>

                    <Route path='/permission-level'>
                        <Route
                            index
                            element={<Table />}
                            loader={tableLoader}
                            errorElement={<ErrorBoundary />}
                        />
                        <Route
                            path=':id'
                            element={<SinglePage />}
                            loader={singleLoader}
                            errorElement={<ErrorBoundary />}
                        />
                        <Route
                            path=':id/edit'
                            element={<EditPage />}
                            loader={editLoader}
                            errorElement={<ErrorBoundary />}
                        />
                        <Route
                            path='create'
                            element={<Sections.PermissionLevel />}
                            errorElement={<ErrorBoundary />}
                        />
                    </Route>

                    <Route path='/subscription'>
                        <Route
                            index
                            element={<Table />}
                            loader={tableLoader}
                            errorElement={<ErrorBoundary />}
                        />
                        <Route
                            path=':id'
                            element={<SinglePage />}
                            loader={singleLoader}
                            errorElement={<ErrorBoundary />}
                        />
                        <Route
                            path=':id/edit'
                            element={<EditPage />}
                            loader={editLoader}
                            errorElement={<ErrorBoundary />}
                        />
                        <Route
                            path='create'
                            element={<Sections.Subscription />}
                            loader={createLoader}
                            errorElement={<ErrorBoundary />}
                        />
                    </Route>

                    <Route path='/subscription-service'>
                        <Route
                            index
                            element={<TableSubscriptionService />}
                            loader={tableLoader}
                            errorElement={<ErrorBoundary />}
                        />
                        <Route
                            path=':id'
                            element={<SinglePage />}
                            loader={singleLoader}
                            errorElement={<ErrorBoundary />}
                        />
                        {/* <Route
                            path=':id/edit'
                            element={<Sections.SubscriptionService />}
                            loader={editLoader}
                        /> */}
                        <Route path=':id/edit'>
                            <Route
                                index
                                element={<Sections.SubscriptionService />}
                                loader={editLoader}
                                errorElement={<ErrorBoundary />}
                            />
                            <Route
                                path='rate/create'
                                element={<Sections.RateNestedService />}
                                loader={serviceRateCreateLoader}
                                errorElement={<ErrorBoundary />}
                            />
                            <Route
                                path='rate/:rateId/edit'
                                element={<Sections.RateNestedService />}
                                loader={serviceRateEditLoader}
                                errorElement={<ErrorBoundary />}
                            />
                        </Route>
                        <Route
                            path='create'
                            element={<Sections.SubscriptionService />}
                            loader={createLoader}
                            errorElement={<ErrorBoundary />}
                        />
                    </Route>

                    <Route path='/service-rate-key'>
                        <Route
                            index
                            element={<Table />}
                            loader={tableLoader}
                            errorElement={<ErrorBoundary />}
                        />
                        <Route
                            path=':id/edit'
                            element={<Sections.ServiceRateKey />}
                            loader={editLoader}
                            errorElement={<ErrorBoundary />}
                        />
                        <Route
                            path='create'
                            element={<Sections.ServiceRateKey />}
                            loader={createLoader}
                            errorElement={<ErrorBoundary />}
                        />
                    </Route>

                    <Route path='/subscription-request'>
                        <Route
                            index
                            element={<Table />}
                            loader={tableLoader}
                            errorElement={<ErrorBoundary />}
                        />
                        {/* <Route
                            path=':id'
                            element={<SinglePage />}
                            loader={singleLoader}
                        /> */}
                        <Route
                            path=':id/edit'
                            element={<Sections.SubscriptionRequest />}
                            loader={editLoader}
                            errorElement={<ErrorBoundary />}
                        />
                        {/* <Route
                            path='create'
                            element={<Sections.SubscriptionService />}
                            loader={createLoader}
                        /> */}
                    </Route>

                    <Route path='/system-message'>
                        <Route
                            index
                            element={<Table />}
                            loader={tableLoader}
                            errorElement={<ErrorBoundary />}
                        />
                        <Route
                            path=':id'
                            element={<SinglePage />}
                            loader={singleLoader}
                            errorElement={<ErrorBoundary />}
                        />
                        <Route
                            path=':id/edit'
                            element={<Sections.SystemMessage />}
                            loader={editLoader}
                            errorElement={<ErrorBoundary />}
                        />
                        <Route
                            path='create'
                            element={<Sections.SystemMessage />}
                            loader={createLoader}
                            errorElement={<ErrorBoundary />}
                        />
                    </Route>

                    <Route path='/user'>
                        <Route
                            index
                            element={<TableUser />}
                            errorElement={<ErrorBoundary />}
                        />
                        <Route
                            path=':id'
                            element={<Sections.User />}
                            loader={singleLoader}
                            errorElement={<ErrorBoundary />}
                        />
                        <Route
                            path=':id/edit'
                            element={<Sections.User />}
                            loader={editLoader}
                            errorElement={<ErrorBoundary />}
                        />
                        <Route
                            path='create'
                            element={<Sections.UserCreate />}
                            loader={createLoader}
                            errorElement={<ErrorBoundary />}
                        />
                    </Route>

                    {/* <Route path='/worker'>
                        <Route index element={<Table />} loader={tableLoader} />
                        <Route
                            path=':id'
                            element={<SinglePage />}
                            loader={singleLoader}
                        />
                        <Route
                            path=':id/edit'
                            element={<EditPage />}
                            loader={editLoader}
                        />
                        <Route path='create' element={<Sections.Worker />} />
                    </Route> */}
                </Route>
            </Route>
            <Route
                path='/login'
                element={<LoginPage />}
                errorElement={<ErrorBoundary />}
            />
            <Route
                path='/register'
                element={<RegisterPage />}
                errorElement={<ErrorBoundary />}
            />
            <Route path='/404' element={<NotFoundPage />} />
            <Route path='*' element={<NotFoundPage />} />
        </Route>,
    ),
)

export default router
