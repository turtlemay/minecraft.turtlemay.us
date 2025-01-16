import { useState, useEffect } from "preact/hooks";
import { getRemoteData } from "../status-api.ts";

import "../styles/status-widget.css";

export default function (props: {
	initialData: Awaited<ReturnType<typeof getRemoteData>>,
}) {
	const [data, setData] = useState(props.initialData);

	if (import.meta.env.PROD) {
		useEffect(updateData, []);
		useEffect(updateDataInterval, []);
	}

	function updateDataInterval() {
		const interval = setInterval(updateData, 60000);
		return () => clearInterval(interval);
	}

	function updateData() {
		getRemoteData().then(v => setData(v));
	}

	const d = data ?? props.initialData;
	if (!d) return false;

	return (
		<div class="status-widget">
			<div>
				<div class="column left">
					<section>
						<img src={d.icon} />
					</section>
					<section>
						<span class="heading">Status</span>
						<span class="online-status" data-id="online-status-text" data-online={`${d.online}`}>
							{d.online ? "Online" : "Offline"}
						</span>
					</section>
					<section>
						<span class="heading">Players</span>
						<span class="players-text">
							<span data-id="online-players-text">{d.players.online}</span>
							<span>/</span>
							<span>{d.players.max}</span>
						</span>
					</section>
					<section>
						<span class="heading">Hostname</span>
						<span class="hostname-text">mc.trtl.in</span>
					</section>
					<section>
						<span class="heading">IP Address</span>
						<span class="ip-text">{d.ip}</span>
					</section>
					<section>
						<span class="heading">Port</span>
						<span class="port-text">{`${d.port}`}</span>&nbsp;
						<span>{`${d.port}` == "25565" && "(Default)"}</span>
					</section>
					<section class="motd">
						<span class="heading">MOTD</span>
						<span class="motd-text">{d.motd.clean}</span>
					</section>
				</div>
				<div class="column right">
					<section>
						<span class="heading">Software</span>
						{d.software}
					</section>
					<section>
						<span class="heading">Plugins</span>
						<ul>
							{[...d.plugins].map(v => (
								<li>
									<span class="plugin-name-text">{v.name}</span>
									<span class="plugin-version-text" title={v.version}>
										{v.version}
									</span>
								</li>
							))}
						</ul>
					</section>
				</div>
			</div>
		</div>
	);
}