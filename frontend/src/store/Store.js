import { configureStore } from "@reduxjs/toolkit";
import ConfigSlice from "./slices/ConfigSlice";
import DrawerSlice from "./slices/DrawerSlice";
import SidebarSlice from "./slices/SideBarSlice";
import authSlice from "./slices/AuthSlice";
import toolsSlice from "./slices/ToolsSlice";
import ProfileSlice from "./slices/ProfileSlice";
import SchedulesSlice from "./slices/SchedulesSlice";
import ProjectSlice from "./slices/ProjectSlice";


export default configureStore({
  reducer: {
    drawer: DrawerSlice,
    config: ConfigSlice,
    sidebar: SidebarSlice,
    auth: authSlice,
    tools: toolsSlice,
    profile: ProfileSlice,
    schedules: SchedulesSlice,
    projects: ProjectSlice
  },
});
