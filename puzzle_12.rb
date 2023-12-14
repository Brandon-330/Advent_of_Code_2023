def parse_line(line)
  springs, contiguous_group_of_damaged_springs = line.split(' ')
  springs = springs * 5
  contiguous_group_of_damaged_springs = contiguous_group_of_damaged_springs * 5
  contiguous_group_of_damaged_springs = contiguous_group_of_damaged_springs.split(',').map(&:to_i)

  [springs, contiguous_group_of_damaged_springs]
end

def valid_combo?(combo, springs)
  hash_idxs = []
  period_idxs = []

  springs.chars.each_with_index do |char, idx|
    if char == '#'
      hash_idxs << idx
    elsif char == '.'
      period_idxs << idx
    end
  end

  combo.chars.each_with_index do |char, idx|
    if char == '#'
      hash_idxs.delete(idx)
    elsif char == '.'
      period_idxs.delete(idx) 
    end
  end

  hash_idxs.empty? && period_idxs.empty?
end

def determine_last_hash_index(string)
  reverse_idx = string.chars.reverse.index('#')
  (string.size - 1) - reverse_idx
end

f = File.new('texts/puzzle_12.txt').read.split("\n")

f.map! do |line|
  springs, contiguous_sizes = parse_line(line)
  new_springs = springs.gsub('#', '?')

  total_combinations = [[new_springs]]
  num_idx = 0
  contiguous_sizes.each do |num|
    iterating_combinations = []

    total_combinations[num_idx].each do |combination|
      if num_idx != 0
        new_combination_idx = determine_last_hash_index(combination)
        next if new_combination_idx + 2 >= combination.size
        previous_combination = combination[0..new_combination_idx + 1]
        combination = combination[new_combination_idx + 2..]
      end

      idx = 0
      while idx + num <= combination.size 
        str = combination[idx, num]

        if str.chars.all? { |char| /[?]/.match?(char) }
          str = '#' * num
          new_combination = combination[0...idx] + str + combination[idx + num..]
          new_combination[idx - 1] = '.' if idx - 1 >= 0
          new_combination[idx + num] = '.' if idx + num < combination.size
          if previous_combination
            iterating_combinations << previous_combination + new_combination
          else
            iterating_combinations << new_combination
          end
        end

        idx += 1
      end
    end

    total_combinations << iterating_combinations
    num_idx += 1
  end
  
  total_combinations[-1].select do |combo|
    valid_combo?(combo, springs)
  end.size
  # Check total combinations if the replaced char matches the hashes from before
end

puts f.inject(0) { |sum, num| sum + num }

# SOLUTION PART 1

# def parse_line(line)
#   springs, contiguous_group_of_damaged_springs = line.split(' ')
#   contiguous_group_of_damaged_springs = contiguous_group_of_damaged_springs.split(',').map(&:to_i)

#   [springs, contiguous_group_of_damaged_springs]
# end

# def valid_combo?(combo, springs)
#   hash_idxs = []
#   period_idxs = []

#   springs.chars.each_with_index do |char, idx|
#     if char == '#'
#       hash_idxs << idx
#     elsif char == '.'
#       period_idxs << idx
#     end
#   end

#   combo.chars.each_with_index do |char, idx|
#     if char == '#'
#       hash_idxs.delete(idx)
#     elsif char == '.'
#       period_idxs.delete(idx) 
#     end
#   end

#   hash_idxs.empty? && period_idxs.empty?
# end

# def determine_last_hash_index(string)
#   reverse_idx = string.chars.reverse.index('#')
#   (string.size - 1) - reverse_idx
# end

# f = File.new('texts/puzzle_12.txt').read.split("\n")

# f.map! do |line|
#   springs, contiguous_sizes = parse_line(line)
#   new_springs = springs.gsub('#', '?')

#   total_combinations = [[new_springs]]
#   num_idx = 0
#   contiguous_sizes.each do |num|
#     iterating_combinations = []

#     total_combinations[num_idx].each do |combination|
#       if num_idx != 0
#         new_combination_idx = determine_last_hash_index(combination)
#         next if new_combination_idx + 2 >= combination.size
#         previous_combination = combination[0..new_combination_idx + 1]
#         combination = combination[new_combination_idx + 2..]
#       end

#       idx = 0
#       while idx + num <= combination.size 
#         str = combination[idx, num]

#         if str.chars.all? { |char| /[?]/.match?(char) }
#           str = '#' * num
#           new_combination = combination[0...idx] + str + combination[idx + num..]
#           new_combination[idx - 1] = '.' if idx - 1 >= 0
#           new_combination[idx + num] = '.' if idx + num < combination.size
#           if previous_combination
#             iterating_combinations << previous_combination + new_combination
#           else
#             iterating_combinations << new_combination
#           end
#         end

#         idx += 1
#       end
#     end

#     total_combinations << iterating_combinations
#     num_idx += 1
#   end
  
#   total_combinations[-1].select do |combo|
#     valid_combo?(combo, springs)
#   end.size
#   # Check total combinations if the replaced char matches the hashes from before
# end

# puts f.inject(0) { |sum, num| sum + num }