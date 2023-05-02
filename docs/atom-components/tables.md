---
title: Tables
---

# {{ $frontmatter.title }}

## Stripped and hovered tables

<PreviewAndCopyCode>

```html{1}
<table class="a-table a-table-stripped a-table-hover">
	<thead>
		<tr>
			<th>Id</th>
			<th>Name</th>
			<th>Value</th>
			<th>Value 2</th>
			<th>Value 3</th>
		</tr>
	</thead>

	<tbody>
		<tr>
			<td>#1254</td>
			<td>Lorem ipsum atria</td>
			<td>value</td>
			<td>Value 2</td>
			<td>Value 3</td>
		</tr>
		<tr>
			<td>#1254</td>
			<td>Lorem ipsum atria</td>
			<td>value</td>
			<td>Value 2</td>
			<td>Value 3</td>
		</tr>
		<tr>
			<td>#1254</td>
			<td>Lorem ipsum atria</td>
			<td>value</td>
			<td>Value 2</td>
			<td>Value 3</td>
		</tr>
	</tbody>
</table>
```

</PreviewAndCopyCode>


## Delimited table

<PreviewAndCopyCode>

```html{1}
<table class="a-table a-table-delimited a-table-hover">
	<thead>
		<tr>
			<th>Id</th>
			<th>Name</th>
			<th>Value</th>
			<th>Value 2</th>
			<th>Value 3</th>
		</tr>
	</thead>

	<tbody>
		<tr>
			<td>#1254</td>
			<td>Lorem ipsum atria</td>
			<td>value</td>
			<td>Value 2</td>
			<td>Value 3</td>
		</tr>
		<tr>
			<td>#1254</td>
			<td>Lorem ipsum atria</td>
			<td>value</td>
			<td>Value 2</td>
			<td>Value 3</td>
		</tr>
		<tr>
			<td>#1254</td>
			<td>Lorem ipsum atria</td>
			<td>value</td>
			<td>Value 2</td>
			<td>Value 3</td>
		</tr>
	</tbody>
</table>
```

</PreviewAndCopyCode>

## Tables headers

<PreviewAndCopyCode>

```html{1,2}
<table class="a-table a-table-hover">
	<thead class="a-table-header-primary">
		<tr>
			<th>Id</th>
			<th>Name</th>
			<th>Value</th>
			<th>Value 2</th>
			<th>Value 3</th>
		</tr>
	</thead>
</table>
```

```html{1,2}
<table class="a-table a-table-hover">
	<thead class="a-table-header-secondary">
		<tr>
			<th>Id</th>
			<th>Name</th>
			<th>Value</th>
			<th>Value 2</th>
			<th>Value 3</th>
		</tr>
	</thead>
</table>
```

```html{1,2}
<table class="a-table a-table-hover">
	<thead class="a-table-header-success">
		<tr>
			<th>Id</th>
			<th>Name</th>
			<th>Value</th>
			<th>Value 2</th>
			<th>Value 3</th>
		</tr>
	</thead>
</table>
```

```html{1,2}
<table class="a-table a-table-hover">
	<thead class="a-table-header-danger">
		<tr>
			<th>Id</th>
			<th>Name</th>
			<th>Value</th>
			<th>Value 2</th>
			<th>Value 3</th>
		</tr>
	</thead>
</table>
```

```html{1,2}
<table class="a-table a-table-hover">
	<thead class="a-table-header-warning">
		<tr>
			<th>Id</th>
			<th>Name</th>
			<th>Value</th>
			<th>Value 2</th>
			<th>Value 3</th>
		</tr>
	</thead>
</table>
```

```html{1,2}
<table class="a-table a-table-hover">
	<thead class="a-table-header-info">
		<tr>
			<th>Id</th>
			<th>Name</th>
			<th>Value</th>
			<th>Value 2</th>
			<th>Value 3</th>
		</tr>
	</thead>
</table>
```

```html{1,2}
<table class="a-table a-table-hover">
	<thead class="a-table-header-light">
		<tr>
			<th>Id</th>
			<th>Name</th>
			<th>Value</th>
			<th>Value 2</th>
			<th>Value 3</th>
		</tr>
	</thead>
</table>
```

```html{1,2}
<table class="a-table a-table-hover">
	<thead class="a-table-header-dark">
		<tr>
			<th>Id</th>
			<th>Name</th>
			<th>Value</th>
			<th>Value 2</th>
			<th>Value 3</th>
		</tr>
	</thead>
</table>

```

</PreviewAndCopyCode>


## Atom DataTables


<PreviewAndCopyCode>

```html
<table class="a-table a-table-stripped a-table-hover" id="myTable">
	<thead>
		<tr>
			<th>Id</th><th>Ville</th><th>Nombre</th><th>Date</th>
		</tr>
	</thead>

	<tbody>
		<tr>
			<td>#1254</td><td>Besançon</td><td>1000</td><td>08/03/2022</td>
		</tr>
		<tr>
			<td>#1255</td><td>Lons-le-Saunier</td><td>3021</td><td>12/01/2023</td>
		</tr>
		<tr>
			<td>#1256</td><td>Strasbourg</td><td>99999</td><td>15/07/2022</td>
		</tr>
		<tr>
			<td>#1257</td><td>Belfort</td><td>1030</td><td>15/07/2022</td>
		</tr>
		<tr>
			<td>#1258</td><td>Paris</td><td>892</td><td>15/07/2022</td>
		</tr>
        <tr>
			<td>#1259</td><td>Orschwiller</td><td>1235</td><td>16/06/2022</td>
		</tr>
        <tr>
			<td>#1260</td><td>Brest</td><td>1155</td><td>18/05/2023</td>
		</tr>
        <tr>
			<td>#1261</td><td>Colmar</td><td>850</td><td>01/01/2023</td>
		</tr>
        <tr>
			<td>#1262</td><td>Nantes</td><td>6666</td><td>11/02/2022</td>
		</tr>
	</tbody>

	<tfoot>
		<tr>
			<th scope="row">Totaux</th>
			<td>/</td>
			<td>105 942</td>
			<td>/</td>
    </tr>
	</tfoot>
</table>
```

```html
<script>
	const table = new AtomDatatable(document.getElementById("myTable"), {

		filterableColumn: [1,2],
        orderableColumn: [1,2,3],
		columnType: {
            3: "d/m/Y",
        },
		nbPerPage: 4, 
		searchInput: true,
		inputSearchClass: "a-custom-class", 
        paginateClass : "a-primary",
        paginationText: true,
  });
</script>
```

</PreviewAndCopyCode>


### DataTable Options

Options should be passed to DataTable as Object (see exemple above)

| Name                | Type                        | Description                                                                                                   | Default Value             |
| ------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------- |
| filterableColumn    | Array.(integer)             | Define columns that can be filtered by search input                                                           | false                     |
| orderableColumn     | Array.(integer)             | Define columns that can be ordered                                                                            | false                     |
| columnType          | Object.(integer, string)    | Define de type of datas if specific (accept `string`, `number`, `Ymd`, `m/d/Y`, `m-d-y`, `d/m/Y`, `d-m-y`)    | false                     |
| nbPerPage           | integer                     | Items by paginated elements                                                                                   | false                     |
| searchInput         | boolean                     | Display and instantiate the input search                                                                      | true                      |
| inputSearchClass    | string                      | Custom class for input search                                                                                 | false                     |
| paginateClass       | string                      | Custom class for pagination buttons                                                                           | false                     |
| paginationText      | boolean                     | Display counting elements text. Only if pagination is active                                                  | true                      |




### Redrawing Table

Atom DataTable might be redraw after adding or remove rows manually.

It will re-rendering pagination, current sorting, maintaining current page if exist or the closer one.

<PreviewAndCopyCode>

```html
<table class="a-table a-table-stripped a-table-hover" id="myTableRedrawable">
	<thead>
		<tr>
			<th>Id</th><th>Ville</th><th>Remove</th>
		</tr>
	</thead>

	<tbody>
		<tr>
			<td>1256</td><td>Besançon</td><td class="center"><button class="delete-button a-btn-sm a-half-danger"><i class="fa-regular fa-trash-can"></i> Delete</button></td>
		</tr>
		<tr>
			<td>1355</td><td>Lons-le-Saunier</td><td class="center"><button class="delete-button a-btn-sm a-half-danger"><i class="fa-regular fa-trash-can"></i> Delete</button></td>
		</tr>
	</tbody>
</table>

<div class="flex ai-c jc-fe">
    <button id="addingRowButton" class="a-btn a-half-primary"><i class="fa-solid fa-plus"></i> Add line</button>
</div>
```

```html
<script>
    const table = document.getElementById("myTableRedrawable");
	const dataTable = new AtomDatatable(table, {

        orderableColumn: [0,1],
		nbPerPage: 4, 
        paginateClass : "a-primary",
        paginationText: true,
        searchInput: true,
    });

    const adderButton = document.getElementById("addingRowButton");
    adderButton.addEventListener("click", () => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `<td>${Math.floor(Math.random() * 99999) }</td><td>${ (Math.random() + 1).toString(36).substring(7) }</td><td class="center"><button class="delete-button a-btn-sm a-half-danger"><i class="fa-regular fa-trash-can"></i> Delete</button></td>`;
        table.querySelector('tbody').append(newRow);
        applyDeleteButtonsListeners();
        dataTable.redraw()
    });

  

    function applyDeleteButtonsListeners(){
        [...document.getElementsByClassName('delete-button')].forEach((el) => {
            el.removeEventListener("click", deleteLineListener, false);
            el.addEventListener("click", deleteLineListener, false);
        });
    }

    function deleteLineListener(e){
        e.target.closest('tr').remove();
        dataTable.redraw();
    }
</script>
```

</PreviewAndCopyCode>