using CatalogService as service from '../../srv/catalog-service';
annotate service.clearance with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'employeeName',
                Value : employeeName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'employeeNumber',
                Value : employeeNumber,
            },
            {
                $Type : 'UI.DataField',
                Label : 'nationality',
                Value : nationality,
            },
            {
                $Type : 'UI.DataField',
                Label : 'department',
                Value : department,
            },
            {
                $Type : 'UI.DataField',
                Label : 'title',
                Value : title,
            },
            {
                $Type : 'UI.DataField',
                Label : 'reason',
                Value : reason,
            },
            {
                $Type : 'UI.DataField',
                Label : 'notes',
                Value : notes,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'employeeName',
            Value : employeeName,
        },
        {
            $Type : 'UI.DataField',
            Label : 'employeeNumber',
            Value : employeeNumber,
        },
        {
            $Type : 'UI.DataField',
            Label : 'nationality',
            Value : nationality,
        },
        {
            $Type : 'UI.DataField',
            Label : 'department',
            Value : department,
        },
        {
            $Type : 'UI.DataField',
            Label : 'title',
            Value : title,
        },
    ],
);

