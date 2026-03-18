<script>
	import ToolCategoryPage from '$lib/assets/components/tool__components/tool_category_page.svelte';
	import content from './tools_content.json';
</script>

<ToolCategoryPage {content} ariaLabel="Tool links" pageClass="tools_page" />
