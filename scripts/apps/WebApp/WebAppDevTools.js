import React from 'react'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

const show_dock = false;
const DockMonitorDefaultIsVisible = (js_dev_mode == "true" && show_dock) ? true : false;

export default createDevTools(
	<DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-w" defaultIsVisible={DockMonitorDefaultIsVisible}>
		<LogMonitor expandActionRoot={show_dock} expandStateRoot={show_dock} />
	</DockMonitor>
)
