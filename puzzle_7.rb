# SOLUTION PART 2

class Hand
  attr_accessor :cards, :bid, :type_strength, :rank

  def initialize(cards, bid)
    @cards = initialize_card_instances(cards)
    @bid = bid.to_i
    @type_strength = determine_type_strength(cards)
    @rank = 0
  end

  def initialize_card_instances(cards_str)
    cards_str.chars.map do |char|
      Card.new(char)
    end
  end

  def cards_strength
    cards.map { |card| card.strength }.join('')
  end

  def determine_type_strength(cards_str)
    case
    when five_of_a_kind? then 0
    when four_of_a_kind? then 1
    when full_house? then 2
    when three_of_a_kind? then 3
    when two_pair? then 4
    when one_pair? then 5
    else
      6
    end
  end

  def jokers
    counter = 0
    cards.each do |card|
      counter += 1 if card.char == 'J'
    end

    counter
  end

  def five_of_a_kind?
    cards.any? { |card| cards.count(card) == (5 - jokers) && card.char != 'J' } || cards.any? { |card| cards.count(card) == 5 }
  end

  def four_of_a_kind?
    cards.any? { |card| cards.count(card) == (4 - jokers) && card.char != 'J' }
  end

  # fIX
  def full_house?
    joker_used = -1
    eligible_pairs = []

    is_not_three_of_a_kind = true
    while is_not_three_of_a_kind && joker_used <= jokers
      current_card = ''
      joker_used += 1
      if cards.any? do |card| 
        current_card = card
        cards.count(card) == (3 - joker_used) && card.char != 'J'
      end
        is_not_three_of_a_kind = false
        eligible_pairs << current_card
      end
    end

    cards.each do |card|
      eligible_pairs << card if cards.count(card) == 2 && card.char != 'J' && !eligible_pairs.include?(card)
    end

    !is_not_three_of_a_kind && eligible_pairs.size + (jokers - joker_used) >= 2
  end

  def three_of_a_kind?
    cards.any? { |card| cards.count(card) == (3 - jokers) && card.char != 'J' }
  end

  # Fix
  def two_pair?
    return false if cards.any? { |card| card.char == 'J' }

    counter = 0
    cards.each do |card|
      counter += 1 if cards.count(card) == 2
    end

    counter == 4
  end

  def one_pair?
    cards.each do |card|
      return true if cards.count { |iterating_card| iterating_card == card || iterating_card.char == 'J' } >= 2
    end

    false
  end

  def <=>(other)
    comparing_num = type_strength <=> other.type_strength
    return comparing_num if comparing_num != 0

    idx = 0
    while comparing_num == 0
      comparing_num = cards[idx] <=> other.cards[idx]
      idx += 1
    end

    comparing_num
  end

  def to_s
    "#{cards.join}"
  end
end

class Card
  CARD_STRENGTH = {
    'A' => 1,
    'K' => 2,
    'Q' => 3,
    'T' => 4,
    '9' => 5,
    '8' => 6,
    '7' => 7,
    '6' => 8,
    '5' => 9,
    '4' => 10,
    '3' => 11,
    '2' => 12,
    'J' => 13
  }

  attr_accessor :char, :strength

  def initialize(char)
    @char = char
    @strength = CARD_STRENGTH[char]
  end
  
  def ==(other)
    strength == other.strength
  end

  def <=>(other)
    strength <=> other.strength
  end

  def to_s
    "#{char}"
  end
end

f = File.new('texts/puzzle_7.txt').readlines.map { |line| line.split(' ') }

all_hands_arr = f.map do |arr|
  cards, bid = arr
  Hand.new(cards, bid)
end

sorted_all_hands_arr = all_hands_arr.sort.reverse

total = 0
sorted_all_hands_arr.each_with_index do |hand, idx|
  rank_num = idx + 1
  total += (hand.bid * rank_num)
end

puts total

# SOLUTION PART 1

# class Hand
#   attr_accessor :cards, :bid, :type_strength, :rank

#   def initialize(cards, bid)
#     @cards = initialize_card_instances(cards)
#     @bid = bid.to_i
#     @type_strength = determine_type_strength(cards)
#     @rank = 0
#   end

#   def initialize_card_instances(cards_str)
#     cards_str.chars.map do |char|
#       Card.new(char)
#     end
#   end

#   def cards_strength
#     cards.map { |card| card.strength }.join('')
#   end

#   def determine_type_strength(cards_str)
#     case
#     when five_of_a_kind? then 0
#     when four_of_a_kind? then 1
#     when full_house? then 2
#     when three_of_a_kind? then 3
#     when two_pair? then 4
#     when one_pair? then 5
#     else
#       6
#     end
#   end

#   def five_of_a_kind?
#     cards.all? { |card| cards[0].strength == card.strength }
#   end

#   def four_of_a_kind?
#     cards.any? { |card| cards.count(card) == 4 }
#   end

#   def full_house?
#     counter = 0

#     cards.each do |card|
#       counter += 1 if cards.count(card) == 2
#     end

#     cards.any? { |card| cards.count(card) == 3 } && counter == 2
#   end

#   def three_of_a_kind?
#     cards.any? { |card| cards.count(card) == 3 }
#   end

#   def two_pair?
#     counter = 0
#     cards.each do |card|
#       counter += 1 if cards.count(card) == 2
#     end

#     counter == 4
#   end

#   def one_pair?
#     cards.each do |card|
#       return true if cards.count(card) == 2
#     end

#     false
#   end

#   def <=>(other)
#     comparing_num = type_strength <=> other.type_strength
#     return comparing_num if comparing_num != 0

#     idx = 0
#     while comparing_num == 0
#       comparing_num = cards[idx] <=> other.cards[idx]
#       idx += 1
#     end

#     comparing_num
#   end

#   def to_s
#     "#{cards.join}"
#   end
# end

# class Card
#   CARD_STRENGTH = {
#     'A' => 1,
#     'K' => 2,
#     'Q' => 3,
#     'J' => 4,
#     'T' => 5,
#     '9' => 6,
#     '8' => 7,
#     '7' => 8,
#     '6' => 9,
#     '5' => 10,
#     '4' => 11,
#     '3' => 12,
#     '2' => 13
#   }

#   attr_accessor :char, :strength

#   def initialize(char)
#     @char = char
#     @strength = CARD_STRENGTH[char]
#   end
  
#   def ==(other)
#     strength == other.strength
#   end

#   def <=>(other)
#     strength <=> other.strength
#   end

#   def to_s
#     "#{char}"
#   end
# end

# f = File.new('texts/puzzle_7.txt').readlines.map { |line| line.split(' ') }

# all_hands_arr = f.map do |arr|
#   cards, bid = arr
#   Hand.new(cards, bid)
# end

# sorted_all_hands_arr = all_hands_arr.sort.reverse

# total = 0
# sorted_all_hands_arr.each_with_index do |hand, idx|
#   rank_num = idx + 1
#   total += (hand.bid * rank_num)
# end

# puts total