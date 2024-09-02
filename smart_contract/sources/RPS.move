address 0x8483163b77cf369c5d0d1090ebd4fef740fa361df453a512889c393c0ba651c2 {
module RPS {
    use std::signer;
    use std::vector;
    use aptos_framework::randomness;

    const ROCK: u8 = 1;
    const PAPER: u8 = 2;
    const SCISSORS: u8 = 3;

    const GAME_TYPE_COMPUTER: u8 = 1;
    const GAME_TYPE_PLAYER: u8 = 2;

    struct Game has store, copy{
        game_id: u64,
        player1: address,
        player2: address,
        player1_move: u8,
        player2_move: u8,
        result: u8,
        game_type: u8,
    }

    struct PlayerState has key {
        games: vector<Game>,
        game_count: u64,
    }

    public entry fun initialize_player(account: &signer) {
        let player_state = PlayerState {
            games: vector::empty(),
            game_count: 0,
        };
        move_to(account, player_state);
    }

    public entry fun start_game(account: &signer, game_type: u8, opponent: address) acquires PlayerState {
        let player = signer::address_of(account);
        let player_state = borrow_global_mut<PlayerState>(player);
        
        let game = Game {
            game_id: player_state.game_count + 1,
            player1: player,
            player2: if (game_type == GAME_TYPE_COMPUTER) player else opponent,
            player1_move: 0,
            player2_move: 0,
            result: 0,
            game_type,
        };
        
        vector::push_back(&mut player_state.games, game);
        player_state.game_count = player_state.game_count + 1;
    }

    public entry fun set_player_move(account: &signer, game_id: u64, player_move: u8) acquires PlayerState {
        let player = signer::address_of(account);
        let player_state = borrow_global_mut<PlayerState>(player);
        let game = vector::borrow_mut(&mut player_state.games, game_id - 1);
            game.player1_move = player_move;
    }

    public entry fun set_opponent_move(account: &signer, game_id : u64, player_move: u8 , opponent:address) acquires PlayerState {
        let player_state = borrow_global_mut<PlayerState>(opponent);
        let player = signer:: address_of(account);
        let game = vector::borrow_mut(&mut player_state.games, game_id-1);
        if(game.player2 == player){
        game.player2_move = player_move;
        }
    }

    #[randomness]
entry fun randomly_set_computer_move(account: &signer, game_id: u64) acquires PlayerState {
    randomly_set_computer_move_internal(account, game_id);
}

public(friend) fun randomly_set_computer_move_internal(account: &signer, game_id:u64) acquires PlayerState {
        let player = signer:: address_of(account);
     let player_state = borrow_global_mut<PlayerState>(player);
        let game = vector::borrow_mut(&mut player_state.games, game_id-1);
        
    let random_number = randomness::u8_range(1, 4);
    game.player2_move = random_number;
}

    public entry fun finalize_game_results(account: &signer, game_id: u64) acquires PlayerState {
        let player = signer::address_of(account);
        let player_state = borrow_global_mut<PlayerState>(player);
        let game = vector::borrow_mut(&mut player_state.games, game_id - 1);
        
        assert!(game.player1_move != 0 && game.player2_move != 0, 0);
        game.result = determine_winner(game.player1_move, game.player2_move);
    }

    fun determine_winner(player1_move: u8, player2_move: u8): u8 {
        if (player1_move == ROCK && player2_move == SCISSORS) {
            1 // player1 wins
        } else if (player1_move == PAPER && player2_move == ROCK) {
            1 // player1 wins
        } else if (player1_move == SCISSORS && player2_move == PAPER) {
            1 // player1 wins
        } else if (player1_move == player2_move) {
            3 // draw
        } else {
            2 // player2 wins
        }
    }

    #[view]
    public fun get_game(account_addr: address, game_id: u64): (u64, address, address, u8, u8, u8, u8) acquires PlayerState {
        let player_state = borrow_global<PlayerState>(account_addr);
        let game = vector::borrow(&player_state.games, game_id - 1);
        (game.game_id, game.player1, game.player2, game.player1_move, game.player2_move, game.result, game.game_type)
    }

    #[view]
    public fun get_game_count(account_addr: address): u64 acquires PlayerState {
        borrow_global<PlayerState>(account_addr).game_count
    }

    #[view]
    public fun get_player(account_addr: address): u8 acquires PlayerState{
        let player_state = borrow_global<PlayerState>(account_addr);
        1
    }
}
}