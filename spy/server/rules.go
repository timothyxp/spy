package main

type rule struct {
	spy      int
	missions []int
}

var Rules []rule = []rule{
	{},
	{
		spy:      0,
		missions: []int{1, 1, 1, 1, 1},
	},
	{
		spy:      1,
		missions: []int{1, 1, 1, 1, 1},
	},
	{
		spy:      1,
		missions: []int{2, 2, 2, 2, 2},
	},
	{
		spy:      1,
		missions: []int{2, 2, 2, 2, 3},
	},
	{
		spy:      2,
		missions: []int{2, 3, 2, 3, 3},
	},
	{
		spy:      2,
		missions: []int{2, 3, 3, 3, 4},
	},
	{
		spy:      3,
		missions: []int{2, 3, 3, 4, 4},
	},
	{
		spy:      3,
		missions: []int{3, 4, 4, 5, 5},
	},
	{
		spy:      3,
		missions: []int{3, 4, 4, 5, 5},
	},
	{
		spy:      4,
		missions: []int{3, 4, 4, 5, 5},
	},
}
