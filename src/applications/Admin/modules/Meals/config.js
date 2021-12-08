export default {
    url: '/meals',
    list: {
        labels: {
            title: 'List of meals',
            new: 'Add new meal',
        },
        fields: [
            {'key': 'id', 'label': 'ID'},
            {'key': 'name', 'label': 'Name'},
            {'key': 'calories'},
            {'key': 'actions', 'label': 'Actions'}
        ]
    },
    create: {
        labels: {
            title: 'Create new meal',
        },
        form: [
            {component: 'TextInput', props: {id: 'name', label: 'Meal name'}},
        ]
    },
    edit: {
        labels: {
            title: 'Edit meal',
        },
        form: [
            {component: 'TextInput', props: {id: 'name', label: 'Meal name'}},
        ]
    }
};
