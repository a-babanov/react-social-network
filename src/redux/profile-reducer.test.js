import profileReducer, { addPost } from "./profile-reducer"

it('length', () => {
    //1. test data
    let action = addPost("it-kamasutra");

    let state = {
        posts: [
            { id: "1", message: "First Post", likesCount: 23 },
            { id: "2", message: "Second Post", likesCount: 24 }
        ]
    }

    //2. action
    let newState = profileReducer(state, action);

    //3. expectation
    expect(newState.posts.length).toBe(3)
})

it('new post', () => {
    //1. test data
    let action = addPost("it-kamasutra");

    let state = {
        posts: [
            { id: "1", message: "First Post", likesCount: 23 },
            { id: "2", message: "Second Post", likesCount: 24 }
        ]
    }

    //2. action
    let newState = profileReducer(state, action);

    //3. expectation
    expect(newState.posts[2].message).toBe("it-kamasutra")
})