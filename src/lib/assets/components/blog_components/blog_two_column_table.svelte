<script>
	let { portableText } = $props();

	const value = $derived.by(() => portableText?.value ?? {});
	const header = $derived.by(() => value?.header ?? {});
	const rows = $derived.by(() => value?.rows ?? []);
</script>

{#if header.leftTitle || header.rightTitle || rows.length}
	<div class="blog_two_column_table">
		<table>
			<colgroup>
				<col class="blog_two_column_table__col blog_two_column_table__col--left" />
				<col class="blog_two_column_table__col blog_two_column_table__col--right" />
			</colgroup>
			{#if header.leftTitle || header.rightTitle}
				<thead>
					<tr>
						<th scope="col">{header.leftTitle}</th>
						<th scope="col">{header.rightTitle}</th>
					</tr>
				</thead>
			{/if}
			{#if rows.length}
				<tbody>
					{#each rows as row, index (row?._key || index)}
						<tr>
							<td>{row?.leftColumn || ''}</td>
							<td>{row?.rightColumn || ''}</td>
						</tr>
					{/each}
				</tbody>
			{/if}
		</table>
	</div>
{/if}

<style>
	.blog_two_column_table {
		margin: 2.5rem 0;
		overflow-x: auto;
		max-width: 100%;
		min-width: 0;
	}

	.blog_two_column_table table {
		width: 100%;
		min-width: 0;
		max-width: 100%;
		border-collapse: collapse;
		table-layout: fixed;
	}

	.blog_two_column_table th,
	.blog_two_column_table td {
		min-width: 0;
		padding: 0.9rem 1rem;
		border-bottom: 1px solid color-mix(in srgb, var(--border) 70%, transparent);
		text-align: left;
		vertical-align: top;
		overflow-wrap: anywhere;
		word-break: break-word;
	}

	.blog_two_column_table th {
		font-weight: 700;
		color: var(--text);
	}

	.blog_two_column_table td {
		color: var(--text);
	}

	@media (min-width: 641px) {
		.blog_two_column_table__col--left {
			width: 30%;
		}

		.blog_two_column_table__col--right {
			width: 70%;
		}
	}

	@media (max-width: 640px) {
		.blog_two_column_table {
			overflow-x: visible;
		}

		.blog_two_column_table table,
		.blog_two_column_table tbody,
		.blog_two_column_table tr,
		.blog_two_column_table td {
			display: block;
			width: 100%;
			max-width: 100%;
			min-width: 0;
		}

		.blog_two_column_table colgroup {
			display: none;
		}

		.blog_two_column_table thead {
			display: none;
		}

		.blog_two_column_table tbody {
			display: grid;
			gap: 1rem;
		}

		.blog_two_column_table tbody tr {
			border: 0.1rem solid color-mix(in srgb, var(--border) 72%, transparent);
			border-radius: 1.2rem;
			background-color: color-mix(in srgb, var(--bg) 88%, var(--bg-secondary));
			overflow: hidden;
		}

		.blog_two_column_table td {
			padding: 0.85rem 0.9rem;
			border-bottom: 0.1rem solid color-mix(in srgb, var(--border) 60%, transparent);
		}

		.blog_two_column_table tbody tr td:last-child {
			border-bottom: 0;
		}
	}
</style>
